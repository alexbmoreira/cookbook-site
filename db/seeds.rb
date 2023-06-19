require 'google/cloud/storage'

ActiveRecord::Base.transaction do
  debugger
  storage = Google::Cloud::Storage.new(
    project_id: 'dazzling-rain-372001',
    credentials: JSON.parse(Base64.decode64(
      Rails.application.credentials[Rails.env.to_sym][:google_cloud_keyfile]
    ))
  )

  files = storage.bucket('twos-company-cookbook').files(prefix: 'recipes/')

  files.each do |file|
    json_data = JSON.parse(file.download.read)
    if Recipe.find_by(slug: json_data['slug']).nil?
      Recipe.create_recipe!(json_data)
      puts "Created recipe '#{json_data['name']}'"
    else
      puts "Recipe '#{json_data['name']}' already exists"
    end
  end
end
