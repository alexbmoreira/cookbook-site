require 'google/cloud/storage'

namespace :recipes do
  task export_recipes_to_google_json: :environment do |_, args|
    ActiveRecord::Base.transaction do
      storage = Google::Cloud::Storage.new
      bucket = storage.bucket(
        Rails.application.credentials[Rails.env.to_sym][:google_cloud_bucket_name]
      )

      Recipe.find_each do |recipe|
        filename = "exports/#{recipe.slug}.json"

        recipe_json = JSON.pretty_generate(
          recipe.as_json(
            except: [:id, :created_at, :updated_at, :deleted_at, :published_at],
            include: {
              recipe_ingredients: {
                except: [:id, :created_at, :updated_at, :deleted_at],
                ingredients: { only: [:name] }
              },
              ingredients: { except: [:created_at, :updated_at, :deleted_at] },
              image: { except: [:id, :created_at, :updated_at, :deleted_at] }
            }
          )
        )

        bucket.create_file(
          StringIO.new(recipe_json), 
          filename, 
          content_type: 'application/json'
        )

        Rails.logger.info "Exported recipe #{recipe.id} to #{filename}"
      end

      puts "Exported #{Recipe.count} recipes to Google Cloud Storage"
    rescue StandardError => e
      Rails.logger.error "Failed to export recipes: #{e.message}"
      puts "Export failed: #{e.message}"
    end
  end

  task import_recipes_from_google_json: :environment do |_, args|
    ActiveRecord::Base.transaction do
      storage = Google::Cloud::Storage.new
      bucket = storage.bucket(
        Rails.application.credentials[Rails.env.to_sym][:google_cloud_bucket_name]
      )
      export_files = bucket.files(prefix: 'exports/')

      successful_imports = 0
      failed_imports = 0

      export_files.each do |file|
        begin
          # Download the file content
          json_content = file.download.string
          recipe_data = JSON.parse(json_content).with_indifferent_access
  
          # Prepare the interaction input
          interaction_input = {
            name: recipe_data[:name],
            image: recipe_data[:image] ? {
              original_filename: recipe_data[:image][:original_filename],
              key: recipe_data[:image][:key],
              path: recipe_data[:image][:path]
            } : nil,
            category: recipe_data[:category],
            prep_time: recipe_data[:prep_time],
            cook_time: recipe_data[:cook_time],
            rest_time: recipe_data[:rest_time],
            steps: recipe_data[:steps],
            servings: recipe_data[:servings],
            created_by_user_id: recipe_data[:created_by_user_id],
            recipe_ingredients: recipe_data[:recipe_ingredients].map do |ingredient|
              {
                quantity: ingredient[:quantity],
                measurement: ingredient[:measurement],
                name: recipe_data[:ingredients].find { _1[:id] == ingredient[:ingredient_id] }[:name]
              }
            end
          }
  
          result = ::Recipes::Create.run!(interaction_input.merge(draftable_id: '1', draftable_type: 'recipe'))
  
          if result.valid?
            successful_imports += 1
          else
            failed_imports += 1
            
            Rails.logger.error "Failed to import recipe: #{result.errors.full_messages.join(', ')}"
          end
        rescue StandardError => e
          failed_imports += 1
          
          # Log any unexpected errors
          Rails.logger.error "Error importing recipe from #{file.name}: #{e.message}"
          Rails.logger.error e.backtrace.join("\n")
        end

        puts "Import complete:"
        puts "Successful imports: #{successful_imports}"
        puts "Failed imports: #{failed_imports}"
      end
    end
  end
end
