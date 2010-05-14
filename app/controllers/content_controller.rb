class ContentController < ApplicationController
  def show
    @content = Content.new #params[:id]
  end
  def last
#    @content = Content.find :last
  end
end
