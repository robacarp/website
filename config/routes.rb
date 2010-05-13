ActionController::Routing::Routes.draw do |map|
  map.home '/', :controller => 'content', :action => 'last'
  map.content '/:id', :controller=>'content', :action => 'show'
  map.ip '/ip', :controller => 'ip', :action => 'index'
  # map.connect ':controller/:action/:id'
  # map.connect ':controller/:action/:id.:format'
end
