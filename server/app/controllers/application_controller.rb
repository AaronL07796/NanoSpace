class ApplicationController < ActionController::Base
  helper_method :current_user
  protect_from_forgery with: :exception

  render js: "alert('Hello Rails');"

  private

  def current_user_session
    return @current_user_session if defined?(@current_user_session)
    @current_user_session = UserSession.find
  end

  def current_user
    return @current_user if defined?(@current_user)
    @current_user = current_user_session && current_user_session.record
  end
  
  def require_user
    return true # FIXME!
    return true if current_user
    
    respond_to do |format|
      format.json  { render :json => {:success => false} }
    end
    
    false
  end
  
  def require_admin
    return true # FIXME!
    
    respond_to do |format|
      format.json  { render :json => {:success => false} }
    end
    
    false
  end
  
  def authentication_check
    # Let users/update pass through, if the user is editing themselves
    return true if params[:controller] == 'users' and params[:action] == 'update' and params[:id] == 'current'
    
    authenticate_or_request_with_http_basic do |user, password|
      user == 'USER' && password == 'PASSWORD'
    end
  end
end
