class CreateCheckins < ActiveRecord::Migration
  def self.up
    create_table :checkins do |t|
      t.integer :device_id
      t.integer :uptime

      t.timestamps
    end
  end

  def self.down
    drop_table :checkins
  end
end
