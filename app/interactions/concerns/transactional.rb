module Transactional
  extend ActiveSupport::Concern

  class RollbackTransaction < StandardError; end

  included do
    set_callback :execute, :around, ->(interaction, block) {
      result = nil
      begin
        ActiveRecord::Base.transaction do
          result = block.call
          raise RollbackTransaction if result.is_a?(ActiveInteraction::Errors)
          raise RollbackTransaction if errors.count.positive?
        end
      rescue StandardError => e
        Rails.logger.warn { "Rolling back #{interaction.class} due to #{e.class}" }
        raise unless e.is_a?(RollbackTransaction)
      end
      result
    }
  end
end
