# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_rcnet_session',
  :secret      => 'cc2edb250327efae132c90aec77ff36458ac9c1ab2d6cca36af9b5d2c0002b9c582a8ff67f71dbeb30bd286b2757eeecd6011cb4f8e209af6c7d1601c7976a7b'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
