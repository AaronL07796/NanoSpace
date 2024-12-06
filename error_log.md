These were the steps to remedy the errors found in the logs.

- [x] Modify `before_filter` to `before_action` in games_controller.rb, achievements_controller.rb, and users_controller.rb.
- [ ] Currently working on: `apache2: Could not reliably determine the server's fully qualified domain name, using 127.0.1.1. Set the 'ServerName' directive globally to suppress this message` (This is a warning)
- [x] Storage.yml modification (storage.yml removed following https://stackoverflow.com/questions/57946281/remove-activestorage-routes-from-rails-6)
- [x] fixed credential error using https://blog.assistancy.be/blog/how-to-store-credentials-in-rails-7/.
- [ ] Database Error
- [ ] Running into issue on CSRF Tokens, seeing issue `Processing by UserSessionsController#create as JSON
  Parameters: {"user_session"=>{"name"=>"[USERNAME]", "password"=>"[FILTERED]"}, "scores"=>{"0"=>{"label"=>"atomatic", "score"=>"40", "misc"=>"Level 0"}, "1"=>{"label"=>"atomatic", "score"=>"120", "misc"=>"Lev>Can't verify CSRF token authenticity.
Completed 422 Unprocessable Content in 0ms (ActiveRecord: 0.0ms | Allocations: 213)

ActionController::InvalidAuthenticityToken (Can't verify CSRF token authenticity.):`
