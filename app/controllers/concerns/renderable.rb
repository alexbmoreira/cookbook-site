module Renderable
  extend ActiveSupport::Concern

  private

  def render_resource(resource, **options)
    if resource.is_a?(Hash) || resource.errors.empty?
      render(json: resource, **options)
    else
      render json: { errors: resource.errors }, status: :unprocessable_entity
    end
  end
end
