class UsersController < ApplicationController
  
  before_action :require_user
  before_action :authentication_check, :only => [:index, :show, :new, :edit, :destroy, :update]
  
  # GET /users
  # GET /users.xml
  def index
    @users = User.all

    respond_to do |format|
      format.html  application.html.erb
      format.xml  { render :xml => @users }
    end
  end

  # GET /users/1
  # GET /users/1.xml
  def show
    @user = User.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @user }
    end
  end

  # GET /users/new
  # GET /users/new.xml
  def new
    @user = User.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @user }
    end
  end

  # GET /users/1/edit
  def edit
    @user = User.find(params[:id])
  end

  # POST /users
  # POST /users.xml
  def create
    flags = params[:user].delete(:flags)
    @user = User.new(params[:user])
    
    respond_to do |format|
      if @user.save
        @user.save_flags flags
        format.html { redirect_to(@user, :notice => 'User was successfully created.') }
        format.xml  { render :xml => @user, :status => :created, :location => @user }
        format.json  { render :json => {:user => @user.frontend_hash}}
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @user.errors, :status => :unprocessable_entity }
        format.json  { render :json => {:error => @user.errors}}
      end
    end
  end

  # PUT /users/1
  # PUT /users/1.xml
  def update
    @user = params[:id] == 'current' ? current_user : User.find(params[:id])
    flags = params[:user].delete(:flags)
    
    respond_to do |format|
      if @user.update_attributes(params[:user])
        @user.save_flags flags
        format.html { redirect_to(@user, :notice => 'User was successfully updated.') }
        format.xml  { head :ok }
        format.json  { render :json => {:user => @user.frontend_hash}}
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @user.errors, :status => :unprocessable_entity }
        format.json  { render :json => {:error => @user.errors}}
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.xml
  def destroy
    @user = User.find(params[:id])
    @user.destroy

    respond_to do |format|
      format.html { redirect_to(users_url) }
      format.xml  { head :ok }
    end
  end
  
  
  def add_score
    @user = current_user
    
    results = {:success => false}
    
    if params[:score]
      game = Game.find_by_label params[:score][:label]
      score = params[:score][:score].to_i
      misc = params[:score][:misc].to_s
      if game
        @user.add_score(game, score, misc)
        results = {:success => true}
      end
    end
    
    respond_to do |format|
      format.json  { render :json => results }
    end
  end
  
  
  def unlock_achievement
    @user = current_user
    
    results = {:success => false}
    
    if @user && params[:achievement]
      achievement = Achievement.find_by_label params[:achievement][:label]
      
      if achievement
        @user.unlock_achievement(achievement)
        results = {:success => true, :achievement => achievement.frontend_hash}
      end
    end
    
    respond_to do |format|
      format.json  { render :json => results }
    end
  end
  
  
  def high_score
    @user = current_user
    game = Game.find_by_label params[:label]
    
    if game
      score = @user.scores.where(:game_id => game).order('score DESC').first
      results = {:score => (score ? score.score : 0), :misc => score.misc}
    else
      results = {:success => false}
    end
    
    respond_to do |format|
      format.json  { render :json => results }
    end
  end
  
  
  def set_flag
    @user = current_user
    
    flag_key = params[:flag_key]
    flag_value = params[:flag_value]
        
    if !@user or !flag_value
      results = {:success => false}
    else
      flags = {}
      flags[flag_key] = flag_value
      @user.save_flags flags
      results = {:success => true}
    end
    
    respond_to do |format|
      format.json  { render :json => results }
    end
  end
  
  
  def save_atom_face
    @user = current_user
    
    if @user && params[:atom_face] && @user.update_attribute(:atom_face, params[:atom_face].to_s)
      results = {:success => true}
    else
      results = {:success => false}
    end
    
    respond_to do |format|
      format.json  { render :json => results }
    end
  end
    
end
