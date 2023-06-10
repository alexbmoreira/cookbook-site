module Api
  module V1
    class RecipesController < ApplicationController
      def show
        render json: Recipe.find_by(slug: params[:slug]), except: [:deleted_at, :created_at, :updated_at], status: :ok
      end

      def index
        category = params[:category].to_sym
        render json: Recipe.send(category), except: [:deleted_at, :created_at, :updated_at], status: :ok
      end
    end
  end
end
