class ApplicationController < ActionController::API
  include ActionController::Cookies
  include Renderable

  before_action :authorize

  def encode_token(payload)
    JWT.encode(payload, Rails.application.credentials[Rails.env.to_sym][:secret_key_base])
  end

  def auth_header
    request.headers['Authorization']
  end

  def decoded_token
    return unless cookies.signed[:jwt]

    begin
      JWT.decode(
        cookies.signed[:jwt],
        Rails.application.credentials[Rails.env.to_sym][:secret_key_base],
        true,
        algorithm: 'HS256'
      )
    rescue JWT::DecodeError
      nil
    end
  end

  def logged_in_user
    return unless decoded_token

    user_id = decoded_token[0]['user_id']
    @user = User.find_by(id: user_id)
  end

  def logged_in?
    !!logged_in_user
  end

  def authorize
    render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
  end

  def ensure_admin
    render json: { message: 'Must be an admin' }, status: :unauthorized unless logged_in_user.admin?
  end

  def deserialized_params
    camel_to_snake(params.permit!.to_h[:data])
  end

  private

  def camel_to_snake(hash)
    hash.each_with_object({}) do |(key, value), result|
      new_value = case value
                  when Hash
                    camel_to_snake(value)
                  when Array
                    value.map { camel_to_snake(_1) }
                  else
                    value
                  end
      result[key.underscore.to_sym] = new_value
    end
  end
end
