class AddRecipeModels < ActiveRecord::Migration[7.0]
  def change
    create_table :ingredients do |t|
      t.string :name, null: false

      t.datetime :deleted_at, index: true
      t.timestamps
    end

    create_table :recipes do |t|
      t.string :name, null: false
      t.string :image
      t.string :slug, null: false
      t.integer :prep_time, null: false
      t.integer :cook_time, null: false
      t.integer :servings
      t.text :steps, null: false
      t.integer :category, default: 0, null: false

      t.datetime :deleted_at, index: true
      t.timestamps
    end
    add_index :recipes, :slug, unique: true

    create_table :recipe_ingredients do |t|
      t.references :ingredient, foreign_key: true, null: false
      t.references :recipe, foreign_key: true, null: false
      t.string :quantity
      t.string :measurement

      t.datetime :deleted_at, index: true
      t.timestamps
    end
  end
end
