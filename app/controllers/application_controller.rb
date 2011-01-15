class ApplicationController < ActionController::Base
  protect_from_forgery

  #rescue_from ActiveRecord::RecordNotFound, :with => :page_not_found
  #rescue_from ActionController::RoutingError, :with => :page_not_found


  #private
  #def page_not_found
  #   flash[:error] = "That page doesn't seem to exist."
  #   redirect_to :back
  #end
end
