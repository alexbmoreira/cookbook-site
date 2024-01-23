module Renderable
  extend ActiveSupport::Concern

  private

  def render_resource(resource, **options)
    if request.method == 'GET' || resource.is_a?(Hash) || resource.errors.empty?
      resource_to_render = resource.is_a?(ActiveInteraction::Base) ? resource.result : resource
      render(json: resource_to_render || {}, **options)
    else
      render json: { errors: serialized_errors(resource.errors) }, status: :unprocessable_entity
    end
  end

  def serialized_errors(resource_errors)
    resource_errors.attribute_names.each_with_object({}) do |attribute, errors|
      message = resource_errors.messages[attribute].first
      errors[attribute.to_s.camelize(:lower)] = resource_errors.full_message(attribute, message)
    end
  end
end
