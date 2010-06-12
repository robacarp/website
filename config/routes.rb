ActionController::Routing::Routes.draw do |map|
  map.home '/', :controller => 'content', :action => 'last'
  map.ip '/ip', :controller => 'ip', :action => 'index'
  map.connect '/ip/list', :controller => 'ip', :action => 'list'
  map.content '/writings/:id', :controller=>'content', :action => 'show'
  map.archives '/archive', :controller=>'content', :action => 'index'
  map.uptime '/uptime/:name/checkin/:uptime/:method', :controller=>'checkins', :action => 'checkin'
  map.uptime '/uptime/:name/checkin/:uptime', :controller=>'checkins', :action => 'checkin'
  map.connect '/uptime/list', :controller=>'checkins',:action=>'list'
  # map.connect ':controller/:action/:id'
  # map.connect ':controller/:action/:id.:format'

  #authentication routes
    map.signup '/signup', :controller => 'users', :action=>'new'
    map.login '/login', :controller => 'sessions', :action=>'new'
    map.logout '/logout', :controller => 'sessions', :action=>'destroy'
  
end
