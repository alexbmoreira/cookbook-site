class NoteSerializer < ActiveModel::Serializer
  attributes :id,
    :body,
    :created_at,
    :updated_at

  belongs_to :recipe, serializer: ::RecipeSerializer
  belongs_to :user, serializer: ::UserSerializer
end
