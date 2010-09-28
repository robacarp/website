class AddTypeToCheckins < ActiveRecord::Migration
  def self.up
    add_column :checkins, :type, :string
  end

  def self.down
    remove_column :checkins, :type
  end
end
