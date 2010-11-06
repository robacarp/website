class RemoveParseMarkdownFromWritings < ActiveRecord::Migration
  def self.up
    remove_column :writings, :parse_markdown
  end

  def self.down
    add_column :writings, :parse_markdown
  end
end
