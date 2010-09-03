class AddPasskeyIpaddressToCheckins < ActiveRecord::Migration
  def self.up
    add_column :checkins, :passkey, :string
    add_column :checkins, :ip, :string
  end

  def self.down
    remove_column :checkins, :ip
    remove_column :checkins, :passkey
  end
end
