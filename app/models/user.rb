require 'digest/sha1'
class User < ActiveRecord::Base
	has_many :orders
	has_one :order, :foreign_key => 'cart_id'

  # Virtual attribute for the unencrypted password
  attr_accessor :password

  validates_presence_of     :login, :email
  validates_presence_of     :password,                   :if => :password_required? 
  validates_presence_of     :password_confirmation,      :if => :password_required? 
  validates_length_of       :password, :within => 4..40, :if => :password_required? 
  validates_confirmation_of :password,                   :if => :password_required? 
  validates_length_of       :login,    :within => 3..40
  validates_length_of       :email,    :within => 3..100
  validates_uniqueness_of   :login, :email, :case_sensitive => false
  before_save :encrypt_password
  
  # prevents a user from submitting a crafted form that bypasses activation
  # anything else you want your user to change should be added here.
  attr_accessible :login, :email, :password, :password_confirmation, :is_guest, :last_accessed_at

  # Authenticates a user by their login name and unencrypted password.  Returns the user or nil.
  def self.authenticate(login, password)
    user = find_by_login(login) # need to get the salt
    user && user.authenticated?(password) ? user : nil
  end

  # Encrypts some data with the salt.
  def self.encrypt(password, salt)
    Digest::SHA1.hexdigest("--#{salt}--#{password}--")
  end

  #creates an invalid user (guest)
  def self.new_shell
    u = User.new
    u.is_guest = true
		u.save(false)
		u.login = "guest"+u.id.to_s
		u.email = "guest"+u.id.to_s
		u.save(false)
		u
  end

  # Encrypts the password with the user salt
  def encrypt(password)
    self.class.encrypt(password, salt)
  end

  def authenticated?(password)
    crypted_password == encrypt(password)
  end

  def remember_token?
    remember_token_expires_at && Time.now.utc < remember_token_expires_at 
  end

  # These create and unset the fields required for remembering users between browser closes
  def remember_me
    remember_me_for 2.weeks
  end

  def remember_me_for(time)
    remember_me_until time.from_now.utc
  end

  def remember_me_until(time)
    self.remember_token_expires_at = time
    self.remember_token            = encrypt("#{email}--#{remember_token_expires_at}")
    save(false)
  end

  def forget_me
    self.remember_token_expires_at = nil
    self.remember_token            = nil
    save(false)
  end

  # Returns true if the user has just been activated.
  def recently_activated?
    @activated
  end

	def guest?
		is_guest
	end

	def old?
		#in the math is calculated in SECONDS
		(Time.new - created_at.time).round() < 60
	end
	
	# before filter 
	def encrypt_password
		return if password.blank?
		self.salt = Digest::SHA1.hexdigest("--#{Time.now.to_s}--#{login}--") if new_record?
		self.crypted_password = encrypt(password)
	end
      
  protected
    def password_required?
			#for guest accounts, a password is not required
      return false if is_guest?
			#if crypted_password is blank, the account is new and a password *is* required
			#if password is not blank, the password is being changed or established.
      crypted_password.blank? || !password.blank? 
    end


end
