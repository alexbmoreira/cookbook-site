class ApplicationController < ActionController::API
  include ActionController::Cookies
  include Renderable

  before_action :authorize

  def encode_token(payload)
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  def auth_header
    request.headers['Authorization']
  end

  def decoded_token
    return unless auth_header

    token = auth_header.split(' ')[1]
    begin
      JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
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
end
