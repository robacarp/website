# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20101112054046) do

  create_table "checkins", :force => true do |t|
    t.integer  "device_id"
    t.integer  "uptime"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "method"
    t.string   "passkey",    :default => ""
    t.string   "ip",         :default => "0.0.0.0"
  end

  create_table "devices", :force => true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "ip_addresses", :force => true do |t|
    t.string   "address"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "count",      :default => 0
  end

  create_table "tagifications", :force => true do |t|
    t.integer  "writing_id"
    t.integer  "tag_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tagifications", ["tag_id", "writing_id"], :name => "index_tagifications_on_tag_id_and_writing_id", :unique => true

  create_table "tags", :force => true do |t|
    t.string   "tag"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tags", ["tag"], :name => "index_tags_on_tag", :unique => true

  create_table "users", :force => true do |t|
    t.string   "email",                               :default => "", :null => false
    t.string   "encrypted_password",   :limit => 128, :default => "", :null => false
    t.string   "password_salt",                       :default => "", :null => false
    t.integer  "failed_attempts",                     :default => 0
    t.string   "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "reset_password_token"
    t.string   "name"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true

  create_table "writings", :force => true do |t|
    t.string   "title"
    t.datetime "date"
    t.text     "content"
    t.boolean  "completed"
    t.boolean  "putInBlogRoll"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "draft",         :default => true
  end

end
