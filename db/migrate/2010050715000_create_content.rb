class CreateContent < ActiveRecord::Migration
  def self.up
    create_table :content do |t|
      t.string :title
      t.datetime :date
      t.binary :text
      t.boolean :completed
      t.boolean :putInBlogRoll
      t.integer :user_id

      t.boolean :parseMarkdown
      t.string :uid
      t.boolean :allowComments
      t.boolean :allowCode
      t.string :linkText
      t.boolean :putInNav
      t.string :author
      t.boolean :deleted
    end
  end

  def self.down
    drop_table :writings
  end
end
