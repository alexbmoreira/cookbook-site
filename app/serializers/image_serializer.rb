class ImageSerializer < ActiveModel::Serializer
  attributes :id,
    :original_filename,
    :key,
    :path
end
