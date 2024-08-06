## Currently Running on Ubuntu 24.04

to be updated and better formatted when we actually figure out how to install anything

# Setup on a new Virtual Machine
1. Install Apache 2 via
> sudo apt install apache2
2. Install sqlite3 and mysql2 via
> sudo apt-get install mysql-server
> 
> sudo apt install sqlite3
3. Install Ruby and RubyGems via
> sudo apt-get install ruby-full
4. Install necessary Ruby Gems via gem
> rails
>
> hike
>
> authlogic
>
> sqlite3
>
> mysql2
>
> passenger
5. Set up mysql database
> 
6. Copy over all files in a folder called /www/ under /var/

7. Setup Passenger
> https://www.phusionpassenger.com/docs/tutorials/deploy_to_production/deploying_your_app/enterprise/aws/ruby/standalone/
> Added `<VirtualHost *:80>
    ServerName 128.113.126.65

    # Tell Apache and Passenger where your app's 'public' directory is
    DocumentRoot /var/www/nanospace/server/public

    PassengerRuby /usr/local/bin/ruby

    # Relax Apache security settings
    <Directory /var/www/nanospace/server/public>
      Allow from all
      Options -MultiViews
      # Uncomment this if you're on Apache > 2.4:
      Require all granted
    </Directory>
</VirtualHost>`

8. Fix issues according to Passenger's error log file, more information in error_log.md
> /var/log/apache2/error.log
> 
~~Adding active storage according to https://edgeguides.rubyonrails.org/active_storage_overview.html and https://guides.rubyonrails.org/active_storage_overview.html~~
Removed Active Storage usage in Rails, must be removed or used between the updates between Rails 5 and Rails 6.

`fixed`

Fixing Secret Key in Production error, no secrets.yml file available in config. This is required by Rails 4.

`currently in progress`
