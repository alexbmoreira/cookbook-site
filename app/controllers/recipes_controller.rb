class RecipesController < ApplicationController
  skip_before_action :authorize, only: [:show, :index]

  def show
    render json: Recipe.includes(recipe_ingredients: :ingredient).find_by(slug: params[:slug]),
      include: [:ingredients],
      status: :ok
  end

  def index
    category = params[:category].to_sym
    render json: Recipe.send(category),
      status: :ok
  end
end
