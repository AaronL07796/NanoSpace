class Achievement < ActiveRecord::Base
  has_and_belongs_to_many :users
  belongs_to :game
  
  def frontend_hash
    {:label => self.label, :title => self.title}
  end
  
end
