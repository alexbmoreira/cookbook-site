class NotesController < ApplicationController
  def user_notes
    render_resource(
      Note.includes(:recipe).where(recipe: { slug: params[:recipe_slug] }, user: @user)
    )
  end

  def create
    note = Note.create(note_params.merge(user: @user))
    render_resource(note)
  end

  def destroy
    Note.find(params[:id]).destroy!
    head :no_content
  end

  private

  def note_params
    input_params = params.slice(:body, :recipe)
    input_params[:recipe_id] = input_params.dig(:recipe, :id)
    input_params.delete(:recipe)

    input_params.permit!
  end
end
