class TagsController < ApplicationController
  def index
    @tags = Tag.all
  end

  def show
    @tag = Tag.find_by_tag params[:tag]
    if @tag.nil?
      flash[:notice] = "That tag hasn't been created yet :'("
      redirect_to :action=>:index
    end
  end

  def by_writing
    writing = Writing.find_by_title params[:writing]
    if writing.nil?
      flash[:notice] = "Could not find writing. O.O"
      @tags = []
    else
      @tags = writing.tags
    end
    render :index
  end
end
