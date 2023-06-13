class AuthenticationController < ApplicationController
  skip_before_action :authorize, only: [:register, :login, :logout]

  def register
    ActiveRecord::Base.transaction do
      user = User.create(user_params)
      if user.save
        token = encode_token({ user_id: user.id })
        cookies.signed[:jwt] = {value:  token, httponly: true, same_site: :strict}
        render json: { user:, token: }, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  def login
    ActiveRecord::Base.transaction do
      user = User.find_by(username: params[:username])

      if user&.authenticate(params[:password])
        token = encode_token({ user_id: user.id })
        cookies.signed[:jwt] = {value:  token, httponly: true, same_site: :strict}
        render json: { user:, token: }, status: :ok
      else
        render json: { error: 'Invalid credentials' }, status: :unauthorized
      end
    end
  end

  def logout
    cookies.delete(:jwt)
    render json: {message: "Logged out"}, status: :accepted
  end

  private

  def user_params
    params.permit(:username, :email, :password, :password_confirmation)
  end
end
