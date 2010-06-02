class ContentController < ApplicationController
  def show
    @content = Content.find params[:id]
  end
  def last
    @content = Content.find :last
  end
  def index
    content = Content.find :all
    @archive = {}
    content.each do |c|
      if !@archive[c.created_at.year] then
        @archive[c.created_at.year] = {}
      end
      if !@archive[c.created_at.year][c.created_at.month] then
        @archive[c.created_at.year][c.created_at.month] = {}
      end
      @archive[c.created_at.year][c.created_at.month] = c
    end
  end
end
