class UserSessionsController < ApplicationController
  
  def new
    @user_session = UserSession.new
  end

  def create
    @user_session = nil
    
    # Are they logging in with a token?
    if params[:token]
      token = params[:token].split(',')
      
      user = User.find_by_id token[0]
      
      if user and token[1] == user.token
        @user_session = UserSession.new(user)
      end
      
    # Otherwise, are they logging in with a user_session?
    else
      @user_session = UserSession.new(params[:user_session])
      puts @user_session.inspect
    end
    
    if @user_session && @user_session.save
      
      # Once the user has logged in, check to see if there is anything to save
      if params[:scores] and not params[:scores].empty?
        scores = params[:scores].map{|i, score| score}
        current_user.save_scores scores
      end
      
      if params[:achievements] and not params[:achievements].empty?
        achievements = params[:achievements].map{|i, achievement| achievement}
        current_user.save_achievements achievements
      end
      
      if params[:flags]
        current_user.save_flags params[:flags]
      end
      
      results = {:user => current_user.frontend_hash}
    else
      results = @user_session ? @user_session.errors : {:error => true}
    end
    
    respond_to do |format|
      format.json  { render :json => results }
    end
    
  end
  
  
  def logged_in
    if current_user
      results = {:user => current_user.frontend_hash}
    else
      results = {:user => nil}
    end
    
    respond_to do |format|
      format.json  { render :json => results }
    end
  end
  

  def destroy
    current_user_session.destroy
    results = {:success => true}
    
    respond_to do |format|
      format.json  { render :json => results }
    end
  end

end
