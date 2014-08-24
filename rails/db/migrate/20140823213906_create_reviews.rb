class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.text :content
      t.integer :course_id

      t.timestamps
    end
    add_index :reviews, :course_id
  end
end
