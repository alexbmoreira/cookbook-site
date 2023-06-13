Rails.application.routes.draw do
  post '/register', to: 'authentication#register'
  post '/login', to: 'authentication#login'
  delete '/logout', to: 'authentication#logout'

  namespace :api do
    namespace :v1 do
      resources :recipes, only: [:index, :show], param: :slug
    end
  end
end
