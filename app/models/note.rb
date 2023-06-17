class Note < ApplicationRecord
  belongs_to :recipe
  belongs_to :user

  validates :body, presence: true
end

# == Schema Information
#
# Table name: notes
#
#  id         :bigint           not null, primary key
#  body       :text             not null
#  deleted_at :datetime
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  recipe_id  :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_notes_on_deleted_at             (deleted_at)
#  index_notes_on_recipe_id              (recipe_id)
#  index_notes_on_user_id                (user_id)
#  index_notes_on_user_id_and_recipe_id  (user_id,recipe_id) UNIQUE WHERE (deleted_at IS NULL)
#
# Foreign Keys
#
#  fk_rails_...  (recipe_id => recipes.id)
#  fk_rails_...  (user_id => users.id)
#
