class CourseSerializer < ActiveModel::Serializer
  embed :ids, include: true

  attributes :id, :name
  has_many :reviews
end
