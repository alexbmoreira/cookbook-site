class RecipeIngredientSerializer < ActiveModel::Serializer
  attributes :quantity,
    :measurement

  attribute(:name) { object.ingredient.name }
end
