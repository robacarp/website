class AddHiddenToWritings < ActiveRecord::Migration
  def self.up
    add_column :writings, :hidden, :boolean, :default=>false
  end

  def self.down
    remove_column :writings, :hidden
  end
end
