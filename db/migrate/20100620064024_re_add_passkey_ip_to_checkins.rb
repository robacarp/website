class ReAddPasskeyIpToCheckins < ActiveRecord::Migration
  def self.up
    remove_column :checkins, :passkey
    remove_column :checkins, :ip

    add_column :checkins, :passkey, :string, :default=>''
    add_column :checkins, :ip, :string, :default=>'0.0.0.0'
  end

  def self.down
    remove_column :checkins, :ip
    remove_column :checkins, :passkey

    add_column :checkins, :passkey, :string
    add_column :checkins, :ip, :string
  end
end
