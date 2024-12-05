class Notifier < ActionMailer::Base
  default :from => "nanospace@http://moleculestothemax.com/"
  
  def password_reset(user)
    @user = user
    mail(:to => user.email)
  end
  
end
