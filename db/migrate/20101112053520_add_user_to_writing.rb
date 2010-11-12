class AddUserToWriting < ActiveRecord::Migration
  def self.up
    add_column :writings, :user, :integer
  end

  def self.down
    remove_column :writings, :user
  end
end
