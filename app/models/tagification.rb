class Tagification < ActiveRecord::Base
  belongs_to :writing
  belongs_to :tag
end
