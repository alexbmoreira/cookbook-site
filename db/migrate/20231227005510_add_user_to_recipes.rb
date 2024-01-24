class AddUserToRecipes < ActiveRecord::Migration[7.0]
  def change
    add_column :recipes, :created_by_user_id, :integer
    add_foreign_key :recipes, :users, column: :created_by_user_id
  end
end
