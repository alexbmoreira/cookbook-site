class AuthenticationController < ApplicationController
  skip_before_action :authorize, only: [:register, :login, :logout]

  def register
    ActiveRecord::Base.transaction do
      user = User.new(user_params)
      if user.save
        token = encode_token({ user_id: user.id })
        cookies.signed[:jwt] = {value:  token, httponly: true, same_site: :strict}
      end
      render_resource(user, status: :created)
    end
  end

  def login
    ActiveRecord::Base.transaction do
      user = User.find_by(username: params[:username])

      if user&.authenticate(params[:password])
        token = encode_token({ user_id: user.id })
        cookies.signed[:jwt] = {value:  token, httponly: true, same_site: :strict}
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
    params.permit(:username, :email, :password, :password_confirmation)
  end
end
