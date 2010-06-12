# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20100612181623) do

  create_table "addresses", :force => true do |t|
    t.string "owner",   :limit => 32,  :default => "", :null => false
    t.string "name",    :limit => 100, :default => "", :null => false
    t.string "lname",   :limit => 50,  :default => "", :null => false
    t.string "phone",   :limit => 20,  :default => "", :null => false
    t.string "phone2",  :limit => 20,  :default => "", :null => false
    t.text   "email",                                  :null => false
    t.text   "address",                                :null => false
    t.string "dob",     :limit => 15,  :default => "", :null => false
  end

  create_table "authdlconfig", :force => true do |t|
    t.string  "name",        :limit => 20,  :default => "", :null => false
    t.string  "value",       :limit => 200, :default => "", :null => false
    t.string  "description", :limit => 200, :default => "", :null => false
    t.integer "editable",                   :default => 1,  :null => false
  end

  create_table "authdlfiledata", :force => true do |t|
    t.integer "masterid", :default => 0, :null => false
    t.binary  "filedata",                :null => false
  end

  create_table "authdlfiles", :force => true do |t|
    t.string "filename",     :limit => 20,  :default => "",                                 :null => false
    t.date   "uploadedDate",                                                                :null => false
    t.string "md5",          :limit => 32,  :default => "00000000000000000000000000000000", :null => false
    t.string "description",  :limit => 200, :default => "No description",                   :null => false
  end

  create_table "authdlusers", :force => true do |t|
    t.string "firstName",       :limit => 20, :default => "", :null => false
    t.string "lastName",        :limit => 25, :default => "", :null => false
    t.string "email",           :limit => 45, :default => "", :null => false
    t.string "password",        :limit => 32, :default => "", :null => false
    t.binary "filePermissions",                               :null => false
  end

  create_table "checkins", :force => true do |t|
    t.integer  "device_id"
    t.integer  "uptime"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "method"
  end

  create_table "comments", :force => true do |t|
    t.string   "userId",          :limit => 32,                                  :null => false
    t.string   "name",            :limit => 65,                                  :null => false
    t.string   "email",           :limit => 200,                                 :null => false
    t.text     "comment",                                                        :null => false
    t.string   "contentid",       :limit => 32,  :default => "0000000000000000", :null => false
    t.datetime "date",                                                           :null => false
    t.boolean  "deleted",                        :default => false,              :null => false
    t.date     "subscribed_date"
  end

  create_table "customers", :force => true do |t|
    t.string  "name",                  :null => false
    t.integer "phone",                 :null => false
    t.string  "address",               :null => false
    t.string  "city",    :limit => 55, :null => false
    t.string  "state",   :limit => 2,  :null => false
    t.integer "zip",                   :null => false
    t.string  "email",                 :null => false
  end

  add_index "customers", ["phone"], :name => "phone", :unique => true

  create_table "devices", :force => true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "httpError", :force => true do |t|
    t.string   "status",    :limit => 3,   :default => "000",     :null => false
    t.string   "request",   :limit => 40,  :default => "",        :null => false
    t.string   "referer",   :limit => 100, :default => "",        :null => false
    t.datetime "time",                                            :null => false
    t.string   "userIP",    :limit => 15,  :default => "0.0.0.0", :null => false
    t.string   "userAgent", :limit => 100, :default => "",        :null => false
    t.string   "httpPost",  :limit => 200, :default => "",        :null => false
  end

  create_table "ip_addresses", :force => true do |t|
    t.string   "address"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "count",      :default => 0
  end

  create_table "sermons", :id => false, :force => true do |t|
    t.string   "title",        :limit => 200, :null => false
    t.date     "publishDate",                 :null => false
    t.datetime "uploadDate",                  :null => false
    t.text     "description",                 :null => false
    t.string   "link",         :limit => 200, :null => false
    t.string   "file",         :limit => 200, :null => false
    t.integer  "filesize",     :limit => 8,   :null => false
    t.string   "userLocation", :limit => 200, :null => false
    t.string   "guid",         :limit => 32,  :null => false
    t.integer  "downloadCt",                  :null => false
    t.datetime "lastDownload",                :null => false
  end

# Could not dump table "sitenews" because of following StandardError
#   Unknown type 'set('true','false')' for column 'published'

  create_table "suppPartners", :force => true do |t|
    t.integer  "missionaryID", :limit => 2,   :default => 0,  :null => false
    t.string   "FName",        :limit => 25,  :default => "", :null => false
    t.string   "LName",        :limit => 25,  :default => "", :null => false
    t.string   "email",        :limit => 100, :default => "", :null => false
    t.string   "phoneNumber",  :limit => 12,  :default => "", :null => false
    t.string   "address",      :limit => 100, :default => "", :null => false
    t.string   "support",      :limit => 6,   :default => "", :null => false
    t.datetime "supportDate",                                 :null => false
  end

  create_table "suppUsers", :force => true do |t|
    t.string "password",       :limit => 12,  :default => "", :null => false
    t.string "FName",          :limit => 25,  :default => "", :null => false
    t.string "LName",          :limit => 25,  :default => "", :null => false
    t.string "Ministry",       :limit => 25,  :default => "", :null => false
    t.string "email",          :limit => 100, :default => "", :null => false
    t.string "supportGoal",    :limit => 6,   :default => "", :null => false
    t.string "supportCurrent", :limit => 6,   :default => "", :null => false
  end

  create_table "tag-links", :id => false, :force => true do |t|
    t.string  "content_uid", :limit => 32,                :null => false
    t.integer "tag_id",                    :default => 0, :null => false
  end

  create_table "tags", :force => true do |t|
    t.string "tag"
  end

  create_table "txtDocument", :force => true do |t|
    t.timestamp "datetime",                       :null => false
    t.string    "fromname", :limit => 250
    t.binary    "email",    :limit => 2147483647
  end

  create_table "users", :force => true do |t|
    t.string   "login"
    t.string   "email"
    t.string   "crypted_password",          :limit => 40
    t.string   "salt",                      :limit => 40
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "last_accessed_at"
    t.string   "remember_token"
    t.datetime "remember_token_expires_at"
    t.boolean  "is_admin",                                :default => false
    t.boolean  "is_guest",                                :default => true
  end

  create_table "writings", :force => true do |t|
    t.boolean  "deleted",                      :default => false,                              :null => false
    t.string   "title",         :limit => 150
    t.string   "author",        :limit => 32,  :default => "-1",                               :null => false
    t.datetime "date",                                                                         :null => false
    t.binary   "text"
    t.boolean  "putInNav",                     :default => false,                              :null => false
    t.string   "linkText",      :limit => 32,                                                  :null => false
    t.boolean  "allowCode",                    :default => false,                              :null => false
    t.boolean  "allowComments",                :default => true,                               :null => false
    t.string   "uid",           :limit => 32,  :default => "00000000000000000000000000000000", :null => false
    t.boolean  "parseMarkdown",                :default => false,                              :null => false
    t.integer  "completed",                    :default => 0,                                  :null => false
    t.boolean  "putInBlogRoll",                :default => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
