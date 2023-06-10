class AuthenticationController < ApplicationController
  def register
    ActiveRecord::Base.transaction do
      user = User.create(user_params)
      if user.save
        token = encode_token({ user_id: user.id })
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
        render json: { user:, token: }, status: :ok
      else
        render json: { error: 'Invalid credentials' }, status: :unauthorized
      end
    end
  end

  private

  def user_params
    params.permit(:username, :email, :password, :password_confirmation)
  end
end
