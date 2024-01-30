class DraftsController < ApplicationController
  before_action :ensure_admin, only: [:create, :update, :destroy]

  def find_by_draftable
    render_resource(
      ::Draft.find_or_create_by(
        draftable_id: params[:draftable_id],
        draftable_type: params[:draftable_type],
        user_id: logged_in_user.id
      ),
      serializer: ::DraftSerializer
    )
  end

  def update
    if draft_params[:autosaved_at].blank?
      return head :bad_request
    end

    draft = find_draft!
    return head :ok if late_autosave_request?(draft)

    draft.update!(**draft_params)

    head :ok
  end

  private

  def late_autosave_request?(draft)
    draft.autosaved_at.present? && Integer(draft_params[:autosaved_at]) < draft.autosaved_at
  end

  def find_draft!
    ::Draft.where(user_id: logged_in_user.id).find(params[:id])
  end

  def draft_params
    deserialized_params.slice(:draft_object, :autosaved_at)
  end
end
