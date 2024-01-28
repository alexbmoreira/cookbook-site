class DraftSerializer < ActiveModel::Serializer
  type 'drafts'

  attributes :id, :draft_object, :autosaved_at
end
