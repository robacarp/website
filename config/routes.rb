Rcnet::Application.routes.draw do
  devise_for :users

  root :to => 'writings#show', :id=>1
  match 'ip/(:action)', :controller => :ip
  match '/session/new.user', :to => redirect('users/login')

  #uptime tracker.  These routes are a bit awkward....
  match '/uptime/:name/checkin/:uptime(/:method)'          => 'checkins#checkin'
  match '/uptime/:name/:passkey/checkin/:uptime(/:method)' => 'checkins#checkin'
  match '/uptime/:name/:passkey/checkin/:uptime/'          => 'checkins#checkin'
  match '/uptime/list'                                     => 'checkins#list'

  #tags, and the writings associated
  get "tag/index"
  get "tag/show"
  resources :tag
  match '/tag/:tag' => 'tags#show'

  resources :writings
  get '/writings/archive'=>'writings#index'
  get '/writings/:slug' => 'writings#show'
  get '/writings/:writing/tags' => 'tags#by_writing'
  #resources :users

end
