class AddNoteModel < ActiveRecord::Migration[7.0]
  def change
    create_table :notes do |t|
      t.references :user, foreign_key: true, null: false
      t.references :recipe, foreign_key: true, null: false
      t.text :body, null: false

      t.datetime :deleted_at, index: true
      t.timestamps
    end
    add_index :notes, [:user_id, :recipe_id], unique: true, where: 'deleted_at IS NULL'
  end
end
