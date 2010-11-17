class User < ActiveRecord::Base
  has_many :writings
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable, :lockable and :timeoutable

  devise :database_authenticatable, :recoverable, :lockable#, :registerable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me
  validates :password, :length=>{:minimum=>4}, :unless=>:no_password_needed

  def no_password_needed
    ! encrypted_password.blank?
  end
end
