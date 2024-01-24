class RecipeIngredientValidator
  def self.validate(recipe_ingredients, record)
    new.validate(recipe_ingredients, record)
  end

  def validate(recipe_ingredients, record)
    ensure_no_duplicate_ingredients(recipe_ingredients, record)
    ensure_valid_format(recipe_ingredients, record)
  end

  private

  def ensure_no_duplicate_ingredients(recipe_ingredients, record)
    ingredient_names = recipe_ingredients.pluck(:name).map(&:downcase)
    return if ingredient_names.uniq.count == ingredient_names.count

    record.errors.add(:recipe_ingredients, 'contains a duplicate ingredient')
  end

  def ensure_valid_format(recipe_ingredients, record)
    recipe_ingredients.each do |recipe_ingredient|
      next if recipe_ingredient[:quantity].blank?

      formatted_quantity = format_quantity_to_fraction(recipe_ingredient[:quantity])
      next if formatted_quantity.present? && formatted_quantity.to_f.positive?

      record.errors.add(:recipe_ingredients, 'contains an invalid ingredient')
    end
  end

  def format_quantity_to_fraction(quantity)
    case quantity
    when /^\d+\s\d+\/\d+$/
      whole, fraction = quantity.split
      whole.to_i + fraction.to_r
    when /^\d+\/\d+$/
      quantity.to_r
    when /^\d*\.?\d+$/
      quantity.to_r
    end
  end
end
