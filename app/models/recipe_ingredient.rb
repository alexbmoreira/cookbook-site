class RecipeIngredient < ApplicationRecord
  belongs_to :recipe
  belongs_to :ingredient

  validates :order, presence: true, numericality: {
    greater_than_or_equal_to: 0
  }
end

# == Schema Information
#
# Table name: recipe_ingredients
#
#  id            :bigint           not null, primary key
#  deleted_at    :datetime
#  measurement   :string
#  order         :integer          not null
#  quantity      :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  ingredient_id :bigint           not null
#  recipe_id     :bigint           not null
#
# Indexes
#
#  index_recipe_ingredients_on_deleted_at                   (deleted_at)
#  index_recipe_ingredients_on_ingredient_id                (ingredient_id)
#  index_recipe_ingredients_on_ingredient_id_and_recipe_id  (ingredient_id,recipe_id) UNIQUE WHERE (deleted_at IS NULL)
#  index_recipe_ingredients_on_recipe_id                    (recipe_id)
#
# Foreign Keys
#
#  fk_rails_...  (ingredient_id => ingredients.id)
#  fk_rails_...  (recipe_id => recipes.id)
#
