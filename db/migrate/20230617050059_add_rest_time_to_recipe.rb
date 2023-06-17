class AddRestTimeToRecipe < ActiveRecord::Migration[7.0]
  def change
    add_column :recipes, :rest_time, :integer
  end
end
