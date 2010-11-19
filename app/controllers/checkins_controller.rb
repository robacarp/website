class CheckinsController < ApplicationController
  def checkin
    checkin = Checkin.new
    checkin.device = Device.find_or_create_by_name_and_passkey params[:name], params[:passkey]
    checkin.uptime = params[:uptime]
    checkin.method = params[:type] || 'manual'
    checkin.ip = request.remote_ip
    checkin.save
  end

  def list
    @devices = Device.find :all
  end
end
