class IpController < ApplicationController
  def index
    @ip = request.headers["HTTP_X_REAL_IP"]
  end
end
