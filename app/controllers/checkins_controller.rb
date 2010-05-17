class CheckinsController < ApplicationController
  def checkin
    checkin = Checkin.new
    checkin.device = Device.find_or_create_by_name params[:name] 
    checkin.uptime = params[:uptime]
    checkin.method = params[:type] || 'manual'
    checkin.save
  end

  def list
    @devices = Device.find :all
  end
end
