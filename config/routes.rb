Rcnet::Application.routes.draw do
  devise_for :users

  root :to => 'writings#show', :id=>1
  match '/session/new.user', :to => redirect('users/login')

  #spare routes for the content
  match '/writings/archive'=>'writings#index'

  #uptime tracker.  These routse are a bit awkward....
  match '/uptime/:name/:passkey/checkin/:uptime/:method' => 'checkins#checkin'
  match '/uptime/:name/checkin/:uptime/:method'          => 'checkins#checkin'
  match '/uptime/:name/:passkey/checkin/:uptime/'        => 'checkins#checkin'
  match '/uptime/:name/checkin/:uptime'                  => 'checkins#checkin'
  match '/uptime/list'                                   => 'checkins#list'

  resources :writings
  resources :users
  resource  :session
end
