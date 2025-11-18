Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  resources :application
  resources :users
  resources :nanospace

  get '/logged_in',	to: 'user_sessions#logged_in'
  post '/login',	to: 'user_sessions#create'
  delete '/logout',	to: 'user_sessions#destroy'
  get '/park',	to: 'nanospace#park1'

  post '/users', to: 'users#create'
  get '/users', to: 'users#index'
  get '/games/:id/high_scores', to: 'games#high_scores'
  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "/csrf_token", to: "csrf#show"

  # Defines the root path route ("/")
  # root "posts#index"
end
