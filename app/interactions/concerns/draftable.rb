module Draftable
  extend ActiveSupport::Concern

  included do
    string :draftable_id
    string :draftable_type
  end

  def delete_drafts_for(user_id)
    Draft.find_by(draftable_id:, draftable_type:, user_id:)&.destroy
  end
end
