class UsersController < ApplicationController
  # Be sure to include AuthenticationSystem in Application Controller instead
 include AuthenticatedSystem

	def index
		@users = User.find :all
	end

  # render new.rhtml
  def new
  end

  def create
    # protects against session fixation attacks, wreaks havoc with 
    # request forgery protection.
		# robert: no clue what this does 
    # uncomment at your own risk
    # reset_session

		#if we already have a user, and it is a guest account, import the form fields
		if current_user and current_user.is_guest?
			current_user.update_attributes params[:user]
			current_user.is_guest = false
			@user = current_user
		#if the current user is not a guest and is still trying to register
		elsif current_user and !current_user.is_guest?
			logger.info "current_user is not guest"
		#if there is no current user...
		else
			@user = User.new(params[:user])
		end
    cookies.delete :auth_token
    @user.save
    if @user.errors.empty?
      self.current_user = @user
      redirect_back_or_default('/')
      flash[:notice] = "Thanks for signing up!"
    else
      render :action => 'new'
    end
  end

	def destroy
		User.find(params[:id]).destroy
		redirect_to users_url
	end

end
