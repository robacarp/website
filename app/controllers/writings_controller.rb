class WritingsController < ApplicationController
  def show
    @writing = Writing.find params[:id]
  end

  def last
    @writing = Writing.find_by_id 77
  end

  def index
    #organize content by year, then month
    writings = Writing.find :all
    @archive = {}
    writings.each do |c|
      if !@archive[c.created_at.year] then
        @archive[c.created_at.year] = {}
      end
      if !@archive[c.created_at.year][c.created_at.month] then
        @archive[c.created_at.year][c.created_at.month] = []
      end
      @archive[c.created_at.year][c.created_at.month].push c
    end
    @archive
  end

  def edit
    @writing = Writing.find params[:id]
  end

  def update
    @writing = Writing.find params[:id]
    if @writing.update_attributes params[:writing] then
      flash[:notice] = 'Writing saved.'
      redirect_to @writing
    else
      render :action => 'edit'
    end
  end

end
