module Renderable
  extend ActiveSupport::Concern

  private

  def render_resource(resource, **options)
    if request.method == 'GET' || resource.is_a?(Hash) || resource.errors.empty?
      render(json: resource, **options)
    else
      render json: { errors: serialized_errors(resource.errors) }, status: :unprocessable_entity
    end
  end

  def serialized_errors(resource_errors)
    resource_errors.attribute_names.each_with_object({}) do |attribute, errors|
      message = resource_errors.messages[attribute].first
      errors[attribute] = resource_errors.full_message(attribute, message)
    end
  end
end
