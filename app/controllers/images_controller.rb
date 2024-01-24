class ImagesController < ApplicationController
  def create
    storage = Google::Cloud::Storage.new
    bucket = storage.bucket(
      Rails.application.credentials[Rails.env.to_sym][:google_cloud_bucket_name]
    )
    uploaded_file = params[:image]
    key = SecureRandom.uuid
    cloud_file = bucket.create_file(
      uploaded_file.path, "images/recipes/#{key}-#{uploaded_file.original_filename}"
    )

    image = Image.new(
      original_filename: uploaded_file.original_filename,
      key: key,
      path: cloud_file.public_url
    )
    render_resource(image, each_serializer: ::ImageSerializer, status: :created)
  end
end
