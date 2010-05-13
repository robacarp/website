class ContentController < ApplicationController
  def show
    @content = Content.find params[:id]
  end
  def last
    @content = Content.find :last
  end
end
