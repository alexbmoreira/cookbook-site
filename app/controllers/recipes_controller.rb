class RecipesController < ApplicationController
  skip_before_action :authorize, only: [:show, :index]
  before_action :ensure_admin, only: [:create, :update, :destroy]

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

  def create
    render_resource(
      ::Recipes::Create.run(recipe_params.merge(created_by_user_id: logged_in_user.id)),
      serializer: ::RecipeSerializer,
      status: :created
    )
  end

  def update
    inputs = recipe_params
    recipe = find_recipe!
    unless recipe_belongs_to_user(recipe)
      return render(
        json: { message: 'Recipe must belong to user' },
        status: :unauthorized
      )
    end
    inputs[:recipe_ingredients] = inputs[:recipe_ingredients].map do |recipe_ingredient|
      recipe_ingredient[:id] = nil unless recipe_ingredient[:id] =~ /^\d+$/

      recipe_ingredient
    end

    render_resource(
      ::Recipes::Update.run(inputs.merge(recipe:)),
      serializer: ::RecipeSerializer,
      status: :created
    )
  end

  def destroy
    recipe = find_recipe!
    unless recipe_belongs_to_user(recipe)
      return render(
        json: { message: 'Recipe must belong to user' },
        status: :unauthorized
      )
    end

    render_resource(
      ::Recipes::Destroy.run!(recipe:),
      serializer: ::RecipeSerializer,
      status: :no_content
    )
  end

  private

  def find_recipe!
    Recipe.find(params[:id])
  end

  def recipe_params
    deserialized_params
  end

  def recipe_belongs_to_user(recipe)
    recipe.created_by_user == logged_in_user
  end
end
