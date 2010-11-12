class MvWritingsUser < ActiveRecord::Migration
  def self.up
    rename_column :writings, :user, :user_id
  end

  def self.down
    rename_column :writings, :user_id, :user
  end
end
