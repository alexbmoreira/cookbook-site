module Recipes
  class Destroy < ApplicationInteraction
    include Transactional

    object :recipe, class: Recipe

    def execute
      recipe.destroy!
    end
  end
end
