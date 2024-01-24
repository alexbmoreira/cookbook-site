class NotesController < ApplicationController
  def user_notes
    render_resource(
      Note.includes(:recipe).find_by(recipe: { slug: params[:recipe_slug] }, user: @user)
    )
  end

  def create
    note = Note.create(note_params.merge(user: @user))
    render_resource(note)
  end

  def update
    note = Note.find(params[:id])
    if note_params[:body].blank?
      note.destroy!
      head :no_content
    else
      note.update!(body: note_params[:body])
      render_resource(note)
    end

  end

  def destroy
    Note.find(params[:id]).destroy!
    head :no_content
  end

  private

  def note_params
    input_params = deserialized_params.slice(:body, :recipe)
    input_params[:recipe_id] = input_params.dig(:recipe, :id)
    input_params.delete(:recipe)

    input_params
  end
end
