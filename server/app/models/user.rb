class User < ActiveRecord::Base
  acts_as_authentic do |c|
    c.login_field = 'name'
  end
  
  has_and_belongs_to_many :achievements
  has_many :scores
  has_many :user_flags
  
  
  def frontend_hash
    flags = {}
    self.user_flags.each {|f| flags[f.flag_key] = f.flag_value}
    
    {
      :name               => self.name,
      :scores             => self.scores.map{|s| {:label => s.game.label, :score => s.score}},
      :achievements       => self.achievements.map{|a| {:label => a.label, :title => a.title}},
      :atom_face          => self.atom_face.to_s,
      :flags              => flags
    }
  end
  
  
  def token
    # [FOR NEW ADMIN] Replace SALT1 & SALT2 with two random salts 
    Digest::MD5.hexdigest("SALT1|#{self.id}|#{self.name}|SALT2")
  end
  
  
  def unlock_achievement(achievement)
    self.achievements << achievement if self.achievements.index(achievement).nil?
    self.save
  end
  
  
  def add_score(game, score, misc)
    # TODO: This writes over existing scores (thus treating it as a high score)
    # We might want to log all scores somewhere so we have a record of each attempt
    return false unless game
    
    score = score.to_i
    s = Score.where(:game_id => game.id).where(:user_id => self.id).first
    s = Score.new(:game_id => game.id, :user_id => self.id) if not s
    
    if not s.score or score > s.score
      s.score = score
      s.misc = misc
      s.save
    end
    
    s
  end
  
  
  # Save scores cached on the frontend
  def save_scores(scores)
    scores.each do |s|
      game = Game.find_by_label s['label']
      next unless game
      self.add_score(game, s['score'], s['misc'])
    end
  end
  
  
  # Save achievements cached on the frontend
  def save_achievements(achievements)
    achievements.each do |a|
      achievement = Achievement.find_by_label a[:label]
      self.unlock_achievement(achievement) if achievement
    end
  end
  
  
  # Save the given user flags
  def save_flags(flags={})
    return unless flags.is_a? Hash
    flags.each do |flag_key, flag_value|
      flag = self.user_flags.find_or_create_by_flag_key(flag_key)
      if !flag_value || flag_value.empty?
        flag.destroy
      else
        flag.flag_value = flag_value
        flag.save
      end
    end
    
    true
  end
    
end
