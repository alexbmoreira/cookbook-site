module Recipes
  class Create < ApplicationInteraction
    include Transactional
    include Draftable

    string :name
    hash :image, default: nil do
      string :original_filename, default: nil
      string :key, default: nil
      string :path, default: nil
    end
    string :category
    integer :prep_time
    integer :cook_time, default: nil
    integer :rest_time, default: nil
    string :steps
    integer :servings
    integer :created_by_user_id
    array :recipe_ingredients, default: [] do
      hash do
        string :quantity, default: nil
        string :measurement, default: nil
        string :name
      end
    end

    validate :ensure_valid_ingredients

    def execute
      recipe = Recipe.new(
        inputs.slice(
          :name,
          :category,
          :prep_time,
          :cook_time,
          :rest_time,
          :steps,
          :servings,
          :created_by_user_id
        )
      )

      recipe_ingredients_attributes = recipe_ingredients.map do |recipe_ingredient|
        ingredient_name = recipe_ingredient.delete(:name).downcase
        ingredient = Ingredient.find_or_initialize_by(name: ingredient_name)
        recipe_ingredient[:ingredient] = ingredient
        recipe_ingredient[:measurement]&.downcase!

        recipe_ingredient
      end

      recipe.assign_attributes(recipe_ingredients_attributes:)
      recipe.assign_attributes(image_attributes: image.compact) if image&.compact.present?

      if recipe.save
        delete_drafts_for(created_by_user_id)
      else
        errors.merge!(recipe.errors)
      end

      recipe
    end

    private

    def ensure_valid_ingredients
      RecipeIngredientValidator.validate(recipe_ingredients, self)
    end
  end
end
