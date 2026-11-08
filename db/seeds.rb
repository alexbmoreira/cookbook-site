require 'google/cloud/storage'

ActiveRecord::Base.transaction do
  user = User.first || User.create!(
    email: ENV.fetch('SEED_USER_EMAIL', 'admin@example.com'),
    username: ENV.fetch('SEED_USER_USERNAME', 'admin'),
    password: ENV.fetch('SEED_USER_PASSWORD', 'password123'),
    password_confirmation: ENV.fetch('SEED_USER_PASSWORD', 'password123'),
    admin: true
  )

  storage = Google::Cloud::Storage.new
  files = storage.bucket('twos-company-cookbook').files(prefix: 'recipes/')

  files.each do |file|
    json_data = JSON.parse(file.download.read)
    if Recipe.find_by(slug: json_data['slug']).nil?
      # Optional times are stored as 0 in some exports, but the model expects nil
      ['cook_time', 'rest_time'].each { |key| json_data[key] = nil if json_data[key].to_i.zero? }

      image_filename = json_data['image']
      json_data['image'] = {
        original_filename: image_filename,
        key: 'tmp',
        path: "https://storage.googleapis.com/twos-company-cookbook/catalog/#{json_data['category']}/#{image_filename}"
      }
      ::Recipes::Create.run!(
        json_data.merge(created_by_user_id: user.id, draftable_id: 'new', draftable_type: 'recipes')
      )
      puts "Created recipe '#{json_data['name']}'"
    else
      puts "Recipe '#{json_data['name']}' already exists"
    end
  end
end
