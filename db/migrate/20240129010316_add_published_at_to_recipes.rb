class AddPublishedAtToRecipes < ActiveRecord::Migration[7.0]
  def change
    add_column :recipes, :published_at, :datetime
  end
end
