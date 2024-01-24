class AddImageModel < ActiveRecord::Migration[7.0]
  def change
    remove_column :recipes, :image, :string

    create_table :images do |t|
      t.string :original_filename, null: false
      t.string :path, null: false
      t.string :key, null: false
      t.references :recipe, foreign_key: true, null: false

      t.datetime :deleted_at, index: true
      t.timestamps
    end
  end
end
