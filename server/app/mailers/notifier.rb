class Notifier < ActionMailer::Base
  # [FOR NEW ADMIN] Change USER@DOMAIN to your preferred email
  default :from => "USER@DOMAIN"
  
  def password_reset(user)
    @user = user
    mail(:to => user.email)
  end
  
end
