Rails.application.routes.draw do
  post '/register', to: 'authentication#register'
  post '/login', to: 'authentication#login'
  delete '/logout', to: 'authentication#logout'

  resources :recipes, only: [:index, :show, :create], param: :slug do
    get 'user_notes', to: 'notes#user_notes'
  end
  patch '/recipes/:id', to: 'recipes#update'
  delete '/recipes/:id', to: 'recipes#destroy'

  resources :images, only: [:create]
  resources :notes, only: [:create, :update, :destroy]
end
