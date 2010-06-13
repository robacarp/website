class AddDraftToWritings < ActiveRecord::Migration
  def self.up
    add_column :writings, :draft, :boolean, :default => true
  end

  def self.down
    remove_column :writings, :draft
  end
end
