require 'google/cloud/storage'

namespace :recipes do
  task :add_recipe_by_filename, [:filename] => :environment do |_, args|
    ActiveRecord::Base.transaction do
      storage = Google::Cloud::Storage.new
      file = storage.bucket(
        Rails.application.credentials[Rails.env.to_sym][:google_cloud_bucket_name]
      ).find_file("recipes/#{args[:filename]}.json")

      json_data = JSON.parse(file.download.read)
      if Recipe.find_by(slug: json_data['slug']).nil?
        json_data.delete('image')
        ::Recipes::Create.run!(json_data.merge(created_by_user_id: User.first.id))
        puts "Created recipe '#{json_data['name']}'"
      else
        puts "Recipe '#{json_data['name']}' already exists"
      end
    end
  end
end
