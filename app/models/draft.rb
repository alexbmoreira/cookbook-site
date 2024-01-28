class Draft < ApplicationRecord; end

# == Schema Information
#
# Table name: drafts
#
#  id             :bigint           not null, primary key
#  autosaved_at   :bigint
#  deleted_at     :datetime
#  draft_object   :jsonb            not null
#  draftable_type :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  draftable_id   :string           not null
#  user_id        :bigint           not null
#
# Indexes
#
#  index_drafts_on_deleted_at                                   (deleted_at)
#  index_drafts_on_user_id                                      (user_id)
#  index_drafts_on_user_id_and_draftable_type_and_draftable_id  (user_id,draftable_type,draftable_id) UNIQUE WHERE (deleted_at IS NULL)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
