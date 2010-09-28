class RenameContentToWritings < ActiveRecord::Migration
  def self.up
    rename_table :content, :writings
  end

  def self.down
    rename_table :writings, :content
  end
end
