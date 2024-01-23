class RecipesController < ApplicationController
  skip_before_action :authorize, only: [:show, :index]

  def show
    render_resource(
      Recipe.includes(recipe_ingredients: :ingredient).find_by(slug: params[:slug]),
      include: [:ingredients, :image],
      status: :ok
    )
  end

  def index
    search_query = params[:search]
    category = params[:category]

    recipes = Recipe.all.order(:category)
    recipes = recipes.where('name ILIKE ?', "%#{search_query}%") if search_query.present?
    recipes = recipes.where(category:) if category.present?

    render_resource(
      recipes,
      each_serializer: ::RecipeSerializer,
      include: [:image]
    )
  end
end
