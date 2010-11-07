class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable, :lockable and :timeoutable

  # interestingly, this works...if you restart the rails server ....
  #if User.all.count == 0
    devise :database_authenticatable, :registerable, :recoverable, :lockable
  #else
  #  devise :database_authenticatable, :recoverable, :lockable
  #end

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me
  validates :password, :length=>{:minimum=>4}
end
