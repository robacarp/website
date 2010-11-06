class AddParseMarkdownToWriting < ActiveRecord::Migration
  def self.up
    add_column :writings, :parse_markdown, :boolean
  end

  def self.down
    remove_column :writings, :parse_markdown
  end
end
