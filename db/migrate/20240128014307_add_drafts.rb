class AddDrafts < ActiveRecord::Migration[7.0]
  def change
    create_table :drafts do |t|
      t.string :draftable_type, null: false
      t.string :draftable_id, null: false
      t.references :user, foreign_key: true, null: false
      t.jsonb :draft_object, null: false, default: {}
      t.bigint :autosaved_at

      t.datetime :deleted_at, index: true
      t.timestamps
    end

    add_index :drafts, [:user_id, :draftable_type, :draftable_id], unique: true, where: 'deleted_at IS NULL'
  end
end
