ActionController::Routing::Routes.draw do |map|
  map.home '/', :controller => 'writings', :action => 'last'

  #spare routes for the content
  map.archives '/writings/archive', :controller=>'writings', :action => 'index'

  #uptime tracker.  These routse are a bit awkward....
  map.uptime '/uptime/:name/checkin/:uptime/:method', :controller=>'checkins', :action => 'checkin'
  map.uptime '/uptime/:name/checkin/:uptime', :controller=>'checkins', :action => 'checkin'
  map.connect '/uptime/list', :controller=>'checkins', :action=>'list'

  #authentication routes
  map.signup  '/signup', :controller => 'users', :action=>'new'
  map.login   '/login', :controller => 'sessions', :action=>'new'
  map.logout  '/logout', :controller => 'sessions', :action=>'destroy'

  map.resources :writings
  map.resources :users
  map.resource  :session

  #reliably connects most controllers
  map.connect  ':controller/:action/:id'
end
