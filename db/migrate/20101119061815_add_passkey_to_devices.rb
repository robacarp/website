class AddPasskeyToDevices < ActiveRecord::Migration
  def self.up
    add_column :devices, :passkey, :string
  end

  def self.down
    remove_column :devices, :passkey
  end
end
