class RecipeIngredient < ApplicationRecord
end

# == Schema Information
#
# Table name: recipe_ingredients
#
#  id            :bigint           not null, primary key
#  deleted_at    :datetime
#  measurement   :integer
#  quantity      :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  ingredient_id :bigint           not null
#
# Indexes
#
#  index_recipe_ingredients_on_deleted_at     (deleted_at)
#  index_recipe_ingredients_on_ingredient_id  (ingredient_id)
#
# Foreign Keys
#
#  fk_rails_...  (ingredient_id => ingredients.id)
#
