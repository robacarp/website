class Tag < ActiveRecord::Base
  has_many :writings, :through => :tagifications
  has_many :tagifications
end
