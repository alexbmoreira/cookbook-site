class RecipeSerializer < ActiveModel::Serializer
  attributes :id,
    :name,
    :image,
    :slug,
    :prep_time,
    :cook_time,
    :rest_time,
    :servings,
    :steps,
    :category,
    :created_by_user_id

  has_many :recipe_ingredients, key: :ingredients, serializer: ::RecipeIngredientSerializer
  has_one :image, serializer: ::ImageSerializer
end
