require 'google/cloud/storage'

Google::Cloud::Storage.configure do |config|
  config.project_id  = 'cookbook-13'
  config.credentials = JSON.parse(Base64.decode64(Rails.application.credentials[Rails.env.to_sym][:google_cloud_keyfile]))
end
