class WritingsController < ApplicationController
  def show
    @writing = Writing.find params[:id]

    if @writing.draft then
      if ! logged_in? then
        flash[:notice] = "That article is not yet published"
        redirect_to '/'
      else 
        flash[:notice] = "This article isn't yet published."
      end
    end

    rescue ActiveRecord::RecordNotFound
      flash[:notice] = "That article is not yet published"
      redirect_to '/'
  end

  def last
    @writing = Writing.find_by_id 77
    render :show
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

  def new 
    @writing = Writing.new
  end

  def create
    @writing = Item.new(params[:writing])
    if @writing.save then
      flash[:notice] = "Writing created and saved"
      redirect_to @writing
    else
      flash[:error] = "There was an error creating or saving the writing"
      render :action => 'new'
    end
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
