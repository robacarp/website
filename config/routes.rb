Rcnet::Application.routes.draw do
  get "tag/index"

  get "tag/show"

  devise_for :users

  root :to => 'writings#show', :id=>1
  match 'ip/(:action)', :controller => :ip
  match '/session/new.user', :to => redirect('users/login')

  #spare routes for the content
  match '/writings/archive'=>'writings#index'

  #uptime tracker.  These routse are a bit awkward....
  match '/uptime/:name/:passkey/checkin/:uptime/:method' => 'checkins#checkin'
  match '/uptime/:name/checkin/:uptime/:method'          => 'checkins#checkin'
  match '/uptime/:name/:passkey/checkin/:uptime/'        => 'checkins#checkin'
  match '/uptime/:name/checkin/:uptime'                  => 'checkins#checkin'
  match '/uptime/list'                                   => 'checkins#list'

  #tags, and the writings associated
  match '/tag/:tag' => 'tags#show'
  match '/writings/:slug' => 'writings#show'
  match '/writings/:writing/tags' => 'tags#by_writing'

  resources :writings
  resources :tag
  #resources :users
end
