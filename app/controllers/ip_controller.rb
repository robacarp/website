class IpController < ApplicationController
  layout 'x_content', :only => :index
  layout 'application', :only => :list

  def index
    @ip = request.remote_ip
    if @ip == '' then
      @ip = nil
    else
      ip = IpAddress.find_or_create_by_address @ip
      ip.count += 1
      ip.save
    end
  end

  def list
    @ips = IpAddress.find :all
  end
end
