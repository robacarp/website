class Writing < ActiveRecord::Base
  has_many :tags, :through => :tagifications
  has_many :tagifications
end
