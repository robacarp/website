ActionController::Routing::Routes.draw do |map|
  map.home '/', :controller => 'content', :action => 'last'
  map.ip '/ip', :controller => 'ip', :action => 'index'
  map.content '/writings/:id', :controller=>'content', :action => 'show'
  map.archives '/archive', :controller=>'content', :action => 'index'
  map.uptime '/uptime/track/:name/:uptime/:method', :controller=>'checkins', :action => 'checkin'
  map.uptime '/uptime/track/:name/:uptime', :controller=>'checkins', :action => 'checkin'
  map.connect '/uptime/list', :controller=>'checkins',:action=>'list'
  # map.connect ':controller/:action/:id'
  # map.connect ':controller/:action/:id.:format'
end
