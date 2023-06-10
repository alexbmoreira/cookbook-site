class Recipe < ApplicationRecord
  enum category: {
    misc: 1,
    breakfast: 2,
    soup: 3,
    side: 4,
    pasta: 5,
    meat_and_poultry: 6,
    fish: 7,
    dessert: 8
  }

  validates :name, presence: true
  validates :cook_time, :prep_time, :servings, presence: true, numericality: {
    greater_than_or_equal_to: 0
  }
end

# == Schema Information
#
# Table name: recipes
#
#  id         :bigint           not null, primary key
#  category   :integer          default("pending"), not null
#  cook_time  :integer          not null
#  deleted_at :datetime
#  image      :string
#  name       :string
#  prep_time  :integer          not null
#  servings   :integer
#  steps      :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_recipes_on_deleted_at  (deleted_at)
#
