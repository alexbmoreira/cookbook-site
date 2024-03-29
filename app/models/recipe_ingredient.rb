class RecipeIngredient < ApplicationRecord
  belongs_to :recipe
  belongs_to :ingredient

  validate :quantity_is_valid, if: -> { quantity.present? }

  private

  def quantity_is_valid
    return if quantity_as_fraction.present? && quantity_as_fraction.to_f.positive?

    errors.add(:quantity, 'is invalid')
  end

  def quantity_as_fraction
    case quantity
    when /^\d+\s\d+\/\d+$/
      whole, fraction = quantity.split
      whole.to_i + fraction.to_r
    when /^\d+\/\d+$/
      quantity.to_r
    when /^\d*\.?\d+$/
      quantity.to_r
    end
  end
end

# == Schema Information
#
# Table name: recipe_ingredients
#
#  id            :bigint           not null, primary key
#  deleted_at    :datetime
#  measurement   :string
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
