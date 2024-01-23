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

  has_many :recipe_ingredients, -> { order(:order) }, dependent: :destroy
  has_one :image, dependent: :destroy
  belongs_to :created_by_user, class_name: 'User'

  validates :name, presence: true
  validates :cook_time, :prep_time, :servings, presence: true, numericality: {
    greater_than_or_equal_to: 0
  }

  def self.create_recipe!(attrs)
    ActiveRecord::Base.transaction do
      recipe_ingredients = attrs.delete('ingredients')
      recipe = Recipe.create!(attrs)
      recipe_ingredients.map do |recipe_ingredient|
        ingredient = Ingredient.find_or_create_by!(name: recipe_ingredient.delete('name'))
        RecipeIngredient.create!(**recipe_ingredient, ingredient: ingredient, recipe: recipe)
      end

      recipe
    end
  end
end

# == Schema Information
#
# Table name: recipes
#
#  id                 :bigint           not null, primary key
#  category           :integer          default(NULL), not null
#  cook_time          :integer          not null
#  deleted_at         :datetime
#  name               :string           not null
#  prep_time          :integer          not null
#  rest_time          :integer
#  servings           :integer
#  slug               :string           not null
#  steps              :text             not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  created_by_user_id :integer
#
# Indexes
#
#  index_recipes_on_deleted_at  (deleted_at)
#  index_recipes_on_slug        (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (created_by_user_id => users.id)
#
