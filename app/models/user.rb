class User < ApplicationRecord
  has_secure_password

  has_many :notes, dependent: :destroy

  validates :password, length: { minimum: 8 }, if: :password
  validates :password, confirmation: true, if: :password
  validates :password_confirmation, presence: true, if: :password

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

  validates :username, presence: true, uniqueness: true, format: {
    with: /\A(?=.{3,25}$)(?![_.])(?!.*[_.]{3})[a-zA-Z0-9._]+(?<![_.])\z/
  }

  validate :password_requirements, if: :password

  private

  def password_requirements
    return false if password.nil?

    rules = {
      letter: /[a-zA-Z]+/,
      number: /\d+/
    }

    rules.each_value do |regex|
      next if regex =~ password

      errors.add(:password, 'must have at least one letter and one number')
    end
  end
end

# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  deleted_at      :datetime
#  email           :string
#  password_digest :string
#  username        :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_deleted_at  (deleted_at)
#
