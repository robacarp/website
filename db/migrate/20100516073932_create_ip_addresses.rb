class CreateIpAddresses < ActiveRecord::Migration
  def self.up
    create_table :ip_addresses do |t|
      t.string :address

      t.timestamps
    end
  end

  def self.down
    drop_table :ip_addresses
  end
end
