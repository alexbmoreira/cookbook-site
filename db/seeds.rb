require 'google/cloud/storage'

ActiveRecord::Base.transaction do
  storage = Google::Cloud::Storage.new
  files = storage.bucket('twos-company-cookbook').files(prefix: 'recipes/')

  files.each do |file|
    json_data = JSON.parse(file.download.read)
    if Recipe.find_by(slug: json_data['slug']).nil?
      image_filename = json_data['image']
      json_data['image'] = {
        original_filename: image_filename,
        key: 'tmp',
        path: "https://storage.googleapis.com/twos-company-cookbook/catalog/#{json_data['category']}/#{image_filename}"
      }
      ::Recipes::Create.run!(json_data.merge(created_by_user_id: User.first.id))
      puts "Created recipe '#{json_data['name']}'"
    else
      puts "Recipe '#{json_data['name']}' already exists"
    end
  end
end
