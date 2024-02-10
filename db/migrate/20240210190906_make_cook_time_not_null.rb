class MakeCookTimeNotNull < ActiveRecord::Migration[7.0]
  def change
    change_column_null :recipes, :cook_time, true
  end
end
