class WritingsController < ApplicationController
  before_filter :authenticate_user!, :except => [:show, :index, :last]

  def show
    @writing = nil
    if !params[:id].nil?
      #flash[:style] = "searching by id"
      @writing = Writing.find params[:id]
    elsif !params[:slug].nil?
      #flash[:style] = "searching by title"
      @writing = Writing.where('title like ? or id = ?',params[:slug],params[:slug]).first
    end

    if @writing.nil? || (@writing.hidden && current_user.nil?)
      flash[:notice] = "That is not yet written."
      redirect_to writings_path
    end
  end

  def recent
    @writing = Writing.find(:all, :order => 'date DESC', :limit => 1)[0]
    render :action => 'show'
  end

  def index
    #organize content by year, then month
    @writings = Writing.order 'writings.date DESC'
    if !current_user
      @writings = @writings.where :hidden=>false
    end
  end

  def new
    @writing = Writing.new
  end

  def create
    @writing = Writing.new(params[:writing])

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
    @writing.user = User.first
    @writing.save
    if @writing.update_attributes params[:writing] then
      flash[:notice] = 'Writing saved.'
      redirect_to @writing
    else
      render :action => 'edit'
    end
  end

  def destroy
    writing = Writing.find params[:id]
    writing.delete
    flash[:notice] = "Writing deleted."
    redirect_to writings_path
  end

end
