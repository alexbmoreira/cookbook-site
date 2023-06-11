class RecipeSerializer < ActiveModel::Serializer
  attributes :id,
    :name,
    :image,
    :slug,
    :prep_time,
    :cook_time,
    :servings,
    :steps,
    :category

  has_many :recipe_ingredients, key: :ingredients, serializer: ::RecipeIngredientSerializer
end
