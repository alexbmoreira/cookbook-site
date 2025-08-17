class AuthenticationController < ApplicationController
  skip_before_action :authorize, only: [:register, :login, :logout]

  def register
    ActiveRecord::Base.transaction do
      user = User.new(user_params)
      if user.save
        token = encode_token({ user_id: user.id })
        set_jwt_token(token)
      end
      render_resource(user, status: :created)
    end
  end

  def login
    ActiveRecord::Base.transaction do
      user = User.find_by(username: user_params[:username])

      if user&.authenticate(user_params[:password])
        token = encode_token({ user_id: user.id })
        set_jwt_token(token)
        render_resource(user, status: :ok)
      else
        render_resource({ error: 'Invalid credentials' }, status: :unauthorized)
      end
    end
  end

  def logout
    cookies.delete(:jwt)
    render_resource({ message: 'Logged out' }, status: :accepted)
  end

  private

  def user_params
    deserialized_params
  end

  def set_jwt_token(token)
    cookies.signed[:jwt] = {
      value: token,
      httponly: true,
      secure: Rails.env.production?,
      same_site: Rails.env.production? ? :none : :lax
    }
  end
end
