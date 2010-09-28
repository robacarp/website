class AddCountToIpAddress < ActiveRecord::Migration
  def self.up
    add_column :ip_addresses, :count, :integer, :default=>0
  end

  def self.down
    remove_column :ip_addresses, :count
  end
end
