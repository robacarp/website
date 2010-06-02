RAILS_GEM_VERSION = '2.3.5' unless defined? RAILS_GEM_VERSION

#RAILS_ENV = "production"

require File.join(File.dirname(__FILE__), 'boot')

Rails::Initializer.run do |config|
  config.time_zone = 'Mountain Time (US & Canada)'
end
