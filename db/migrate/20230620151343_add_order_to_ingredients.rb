class AddOrderToIngredients < ActiveRecord::Migration[7.0]
  def change
    add_column :recipe_ingredients, :order, :integer, null: false
    add_index :ingredients, :name, unique: true
    add_index :recipe_ingredients, [:ingredient_id, :recipe_id], unique: true, where: 'deleted_at IS NULL'
  end
end
