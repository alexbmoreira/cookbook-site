class Ingredient < ApplicationRecord
  validates :name, presence: true
end

# == Schema Information
#
# Table name: ingredients
#
#  id         :bigint           not null, primary key
#  deleted_at :datetime
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_ingredients_on_deleted_at  (deleted_at)
#
