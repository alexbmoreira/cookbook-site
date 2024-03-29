# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_02_10_190906) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "drafts", force: :cascade do |t|
    t.string "draftable_type", null: false
    t.string "draftable_id", null: false
    t.bigint "user_id", null: false
    t.jsonb "draft_object", default: {}, null: false
    t.bigint "autosaved_at"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["deleted_at"], name: "index_drafts_on_deleted_at"
    t.index ["user_id", "draftable_type", "draftable_id"], name: "index_drafts_on_user_id_and_draftable_type_and_draftable_id", unique: true, where: "(deleted_at IS NULL)"
    t.index ["user_id"], name: "index_drafts_on_user_id"
  end

  create_table "images", force: :cascade do |t|
    t.string "original_filename", null: false
    t.string "path", null: false
    t.string "key", null: false
    t.bigint "recipe_id", null: false
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["deleted_at"], name: "index_images_on_deleted_at"
    t.index ["recipe_id"], name: "index_images_on_recipe_id"
  end

  create_table "ingredients", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["deleted_at"], name: "index_ingredients_on_deleted_at"
    t.index ["name"], name: "index_ingredients_on_name", unique: true
  end

  create_table "notes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "recipe_id", null: false
    t.text "body", null: false
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["deleted_at"], name: "index_notes_on_deleted_at"
    t.index ["recipe_id"], name: "index_notes_on_recipe_id"
    t.index ["user_id", "recipe_id"], name: "index_notes_on_user_id_and_recipe_id", unique: true, where: "(deleted_at IS NULL)"
    t.index ["user_id"], name: "index_notes_on_user_id"
  end

  create_table "recipe_ingredients", force: :cascade do |t|
    t.bigint "ingredient_id", null: false
    t.bigint "recipe_id", null: false
    t.string "quantity"
    t.string "measurement"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["deleted_at"], name: "index_recipe_ingredients_on_deleted_at"
    t.index ["ingredient_id", "recipe_id"], name: "index_recipe_ingredients_on_ingredient_id_and_recipe_id", unique: true, where: "(deleted_at IS NULL)"
    t.index ["ingredient_id"], name: "index_recipe_ingredients_on_ingredient_id"
    t.index ["recipe_id"], name: "index_recipe_ingredients_on_recipe_id"
  end

  create_table "recipes", force: :cascade do |t|
    t.string "name", null: false
    t.string "slug", null: false
    t.integer "prep_time", null: false
    t.integer "cook_time"
    t.integer "servings"
    t.text "steps", null: false
    t.integer "category", default: 0, null: false
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "rest_time"
    t.integer "created_by_user_id"
    t.datetime "published_at"
    t.index ["deleted_at"], name: "index_recipes_on_deleted_at"
    t.index ["slug"], name: "index_recipes_on_slug", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "admin", default: false, null: false
    t.index ["deleted_at"], name: "index_users_on_deleted_at"
  end

  add_foreign_key "drafts", "users"
  add_foreign_key "images", "recipes"
  add_foreign_key "notes", "recipes"
  add_foreign_key "notes", "users"
  add_foreign_key "recipe_ingredients", "ingredients"
  add_foreign_key "recipe_ingredients", "recipes"
  add_foreign_key "recipes", "users", column: "created_by_user_id"
end
