class WritingsController < ApplicationController
  def show
    @writing = Writing.find params[:id]
#    flash[:notice] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel odio eros, sit amet hendrerit elit. Vestibulum placerat sagittis pretium. Etiam ullamcorper mi velit. Ut blandit, urna vitae mattis dictum, nisl felis sodales velit, at varius nulla mauris vel leo. Integer dignissim venenatis fermentum. Integer et quam quis velit interdum porta. Mauris a felis ut dolor ornare pulvinar. Duis a imperdiet neque. Nullam at augue non mi placerat tempus. Cras et laoreet lacus. Pellentesque rutrum vehicula turpis id varius. Sed velit quam, fermentum at viverra quis, posuere sit amet sapien. Aliquam non tortor eu eros semper eleifend eu a libero. In hac habitasse platea dictumst. Ut nisi arcu, rhoncus ut accumsan sit amet, interdum vel nisl."
#    flash[:error] = "Lorem ipsum dolor sit amet"
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
