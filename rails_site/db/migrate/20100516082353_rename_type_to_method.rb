class RenameTypeToMethod < ActiveRecord::Migration
  def self.up
    rename_column :checkins, :type, :method
  end

  def self.down
    rename_column :checkins, :method, :type
  end
end
