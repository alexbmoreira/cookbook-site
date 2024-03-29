class AddUser < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password_digest

      t.datetime :deleted_at, index: true
      t.timestamps
    end
  end
end
