class CreateUsers < ActiveRecord::Migration
  def self.up
    create_table "users", :force => true do |t|
      t.string :login
      t.string :email
      t.string :crypted_password,          :limit => 40
      t.string :salt,                      :limit => 40
      t.datetime :created_at
      t.datetime :updated_at
			t.datetime :last_accessed_at
      t.string :remember_token
      t.datetime :remember_token_expires_at
			t.boolean  :is_admin,		:default => false
			t.boolean  :is_guest, 	:default => true
			t.timestamps
    end
	end

  def self.down
    drop_table :users
  end
end
