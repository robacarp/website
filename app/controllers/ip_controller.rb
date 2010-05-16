class IpController < ApplicationController
  def index
    @ip = request.headers["HTTP_X_REAL_IP"]
    ip = IpAddress.find_or_create_by_address @ip
    ip.count += 1
    ip.save
  end

  def list
    @ips = IpAddress.find :all
  end
end
