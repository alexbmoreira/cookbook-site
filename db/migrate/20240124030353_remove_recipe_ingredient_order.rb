class RemoveRecipeIngredientOrder < ActiveRecord::Migration[7.0]
  def change
    remove_column :recipe_ingredients, :order, :integer
  end
end
