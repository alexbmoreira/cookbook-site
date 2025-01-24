class Recipe < ApplicationRecord
  enum category: {
    misc: 1,
    breakfast: 2,
    snack: 3,
    soup: 4,
    salad: 5,
    side: 6,
    pasta: 7,
    meat_and_poultry: 8,
    seafood: 9,
    vegetarian: 10,
    dessert: 11,
    drink: 12
  }

  has_many :recipe_ingredients, -> { order(:created_at) }, dependent: :destroy
  has_many :ingredients, through: :recipe_ingredients
  has_one :image, dependent: :destroy
  belongs_to :created_by_user, class_name: 'User'

  validates :name, presence: true
  validates :prep_time, :servings, presence: true, numericality: { greater_than: 0 }
  validates :cook_time, numericality: { greater_than: 0 }, if: -> { cook_time }
  validates :rest_time, numericality: { greater_than: 0 }, if: -> { rest_time }

  before_validation :generate_slug

  accepts_nested_attributes_for :recipe_ingredients, allow_destroy: true
  accepts_nested_attributes_for :image, allow_destroy: true

  private

  def generate_slug
    return unless will_save_change_to_name?

    self.slug = name.parameterize
  end

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
#  cook_time          :integer
#  deleted_at         :datetime
#  name               :string           not null
#  prep_time          :integer          not null
#  published_at       :datetime
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
