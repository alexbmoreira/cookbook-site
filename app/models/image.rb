class Image < ApplicationRecord; end

# == Schema Information
#
# Table name: images
#
#  id                :bigint           not null, primary key
#  deleted_at        :datetime
#  key               :string           not null
#  original_filename :string           not null
#  path              :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  recipe_id         :bigint           not null
#
# Indexes
#
#  index_images_on_deleted_at  (deleted_at)
#  index_images_on_recipe_id   (recipe_id)
#
# Foreign Keys
#
#  fk_rails_...  (recipe_id => recipes.id)
#
