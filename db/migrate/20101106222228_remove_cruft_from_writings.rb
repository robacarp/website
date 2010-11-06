class RemoveCruftFromWritings < ActiveRecord::Migration
  def self.up
    change_table :writings do |t|
      t.remove :parseMarkdown
      t.remove :uid
      t.remove :allowComments
      t.remove :allowCode
      t.remove :linkText
      t.remove :putInNav
      t.rename :text, :content
      t.change :content, :text
      t.remove :author
      t.remove :deleted
    end
  end

  def self.down
  end
end
