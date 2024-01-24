module Recipes
  class Update < ApplicationInteraction
    include Transactional

    object :recipe, class: Recipe
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
    array :recipe_ingredients, default: [] do
      hash do
        integer :id, default: nil
        string :quantity, default: nil
        string :measurement, default: nil
        string :name
      end
    end

    validate :ensure_valid_ingredients

    def execute
      recipe.assign_attributes(
        inputs.slice(
          :name,
          :category,
          :prep_time,
          :cook_time,
          :rest_time,
          :steps,
          :servings,
        )
      )
      update_recipe_ingredients
      update_image

      errors.merge!(recipe.errors) unless recipe.save

      recipe
    end

    private

    def update_recipe_ingredients
      recipe_ingredient_ids = recipe_ingredients.pluck(:id)
      deleted_recipe_ingredients = recipe.recipe_ingredients.reject do
        recipe_ingredient_ids.include?(_1.id)
      end
      deleted_recipe_ingredients.each(&:mark_for_destruction)

      recipe_ingredients_attributes = recipe_ingredients.map do |recipe_ingredient|
        ingredient_name = recipe_ingredient.delete(:name).downcase
        ingredient = Ingredient.find_or_initialize_by(name: ingredient_name)
        recipe_ingredient[:ingredient] = ingredient
        recipe_ingredient[:measurement]&.downcase!

        recipe_ingredient
      end
      recipe.recipe_ingredients = recipe.recipe_ingredients.reject do
        deleted_recipe_ingredients.include?(_1)
      end
      recipe.assign_attributes(recipe_ingredients_attributes:)
    end

    def update_image
      return recipe.assign_attributes(image_attributes: image.compact) if image&.compact.present?

      recipe.image&.mark_for_destruction
    end

    def ensure_valid_ingredients
      RecipeIngredientValidator.validate(recipe_ingredients, self)
    end
  end
end
