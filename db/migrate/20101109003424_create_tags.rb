class CreateTags < ActiveRecord::Migration
  def self.up
    create_table :tags do |t|
      t.string :tag
      t.timestamps
    end
    add_index :tags, :tag, :unique=>true
  end

  def self.down
    drop_table :tags
  end
end