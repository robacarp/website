class AddTimesToContent < ActiveRecord::Migration
  def self.up
    add_column :content, :created_at, :timestamp
    add_column :content, :updated_at, :timestamp
  end

  def self.down
    remove_column :content, :updated_at
    remove_column :content, :created_at
  end
end
