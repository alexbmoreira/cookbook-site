module Api
  module V1
    class RecipesController < ApplicationController
      def index
        render json: Recipe.all, except: [:deleted_at, :created_at, :updated_at], status: :ok
      end
    end
  end
end
