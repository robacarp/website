class CreateTagifications < ActiveRecord::Migration
  def self.up
    create_table :tagifications do |t|
      t.integer :writing_id
      t.integer :tag_id
      t.timestamps
    end
    add_index :tagifications, [:tag_id, :writing_id], :unique=>true
  end

  def self.down
    drop_table :tagifications
  end
end
