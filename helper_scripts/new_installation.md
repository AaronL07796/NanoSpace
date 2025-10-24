# Deployment Guide for NanoSpace

### **Prerequisites**

  * A new, clean VM instance.
  * SSH access with a user that has `sudo` privileges.
  * Your project's `app` and `public` directories ready to be copied over.

-----

## 1. Install System Dependencies

First, we will install the primary components sequentially. These commands can be run from any directory.

1.  **Install Apache2**: The web server.

    ```bash
    sudo apt update
    sudo apt install -y apache2
    ```

2.  **Install MySQL**: The database server.

    ```bash
    sudo apt install -y mysql-server libmysqlclient-dev
    sudo apt install -y sqlite3 libsqlite3-dev
    ```

3.  **Install Ruby**: The programming language and its tools.

    ```bash
    sudo apt install -y ruby-full build-essential
    ```

-----

##  2. Install Ruby on Rails

Next, install the Rails framework using RubyGems.

```bash
sudo gem install rails
```

-----

##  3. Create the Rails Application

Navigate to `/var/www/nanospace/` and generate the new Rails application.

  * **Run from**: `/var/www/www/nanospace/`
    ```bash
    # Create the Rails app inside a 'server' subdirectory
    sudo rails new server
    ```

-----

##  4. Configure Application Gems

Edit the `Gemfile` to include all required libraries.

1.  **Open the Gemfile**:

      * **Run from**: `/var/www/nanospace/server`
        ```bash
        sudo vim /var/www/nanospace/server/Gemfile
        ```

2.  **Add the required gems (if not already in file)**:

    ```ruby
    gem 'rails'
    gem 'hike'
    gem 'authlogic'
    gem 'sqlite3'
    gem 'mysql2'
    gem 'passenger'
    ```

3.  **Install the gems**:

      * **Run from**: `/var/www/nanospace/server`
        ```bash
        sudo bundle install
        ```

-----

##  5. Integrate NanoSpace Project Files

**Replace the default folders with project's:** 
**Run from**: `/var/www/nanospace/server`

        ```bash
        
        # Remove the existing app and public folders
        sudo rm -rf app
        sudo rm -rf public
        
        # Copy over the new folders from your working copy
        # Example using scp (replace USER and source paths appropriately)
        scp -r /path/to/local/app USER@nanotoon.cs.rpi.edu:/var/www/nanospace/server/
        scp -r /path/to/local/public USER@nanotoon.cs.rpi.edu:/var/www/nanospace/server/
        
        # Ensure proper ownership for Apache
        sudo chown -R www-data:www-data /var/www/nanospace

        ```

-----

## 6.  Grep for [FOR NEW ADMIN] and make changes as recommended in comments

## 7.  By this point, the park of NanoSpace should be available upon starting the Apache2 server. However, none of the games or login/signup will work or display, as they require at least a (nonfunctional) database that they can read to be able to start. This may change in the future if our code changes.

## 8.  Set Up mysql2 Production Database & Account


```
   sudo mysql -u root -p

   -- Create the production database
   CREATE DATABASE nanospace_production
   CHARACTER SET utf8
   COLLATE utf8_general_ci;

   -- Create a dedicated app user (change username/password!)
   CREATE USER 'nanospace_prod'@'localhost' IDENTIFIED BY 'CHANGE_ME_SUPER_STRONG_PW';

   -- Grant privileges to that user on the prod DB
   GRANT ALL PRIVILEGES ON nanospace_production.* TO 'nanospace_prod'@'localhost';

   FLUSH PRIVILEGES;
   EXIT;

```

## 9.   Set up Phusion Passenger 

```
  sudo passenger-install-apache2-module

  Follow on-screen instructions and add the output several LoadModoule and configuration lines to:
  /etc/apache2/apache2.conf

```
The current working config on the server
  file:
'''  /etc/apache2/sites-avaialable/nanospace.conf
#<VirtualHost *:80>
#       RewriteEngine On
#       RewriteCond %{HTTPS} off
#       RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI}
#</VirtualHost>

<VirtualHost *:80>
    # Change this to your server's public IP address or domain name
    ServerName nanotoon.cs.rpi.edu

    # This must be the full path to your Rails app's public directory
    DocumentRoot /var/www/nanospace/server/public

    PassengerAppEnv production
    SetEnv RAILS_MASTER_KEY "7557b8885285187e7e455229f97c72c7"

    # This section is crucial for Passenger and file permissions
    <Directory /var/www/nanospace/server/public>
        Allow from all
        Options -MultiViews
        Require all granted
    </Directory>
</VirtualHost>

<VirtualHost 128.113.126.65:80>
        AddDefaultCharset utf-8
        ServerAdmin nanospace@nanotoon.cs.rpi.edu
        ServerName nanotoon.cs.rpi.edu
        DocumentRoot /var/www/nanospace/server/public
        PassengerRuby /usr/local/bin/ruby
        PassengerAppEnv production
        SetEnv RAILS_MASTER_KEY "7557b8885285187e7e455229f97c72c7"

        <Files .*>
                Order allow,deny
                Deny from all
        </Files>

        <Files *~>
                Order allow,deny
                Deny from all
        </Files>

        <Files #*>
                Order allow,deny
                Deny from all
        </Files>

        # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
        # error, crit, alert, emerg.

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        <Directory /var/www/nanospace/server/public>
                Allow from all
                Options -MultiViews
                Require all granted
        </Directory>
</VirtualHost>

'''
* Enable the Site & Reload Apache

```
sudo a2ensite nanospace.conf
sudo systemctl reload apache2
sudo systemctl restart apache2a
```

## 10. Configure Rails Routes

* Add Required Routes

File: /var/www/nanospace/server/config/routes.rb
```
get '/logged_in', to: 'user_sessions#logged_in'
post '/login',    to: 'user_sessions#create'
delete '/logout', to: 'user_sessions#destroy'

```

## 11. Check for Deprecated Ruby/Rails Code
If porting from older NanoSpace versions (2013 or older):

* Replace before_filter with before_action

* Review files in /var/www/nanospace/server/apps for Ruby 2.x → 3.x compatibility issues

* To help find deprecated code:
```
grep -R "before_filter" /var/www/nanospace/server
```

## 12. Configure database.yml, storage.yml, credentials, and master.key

Make sure each file looks like below: 

* config/database.yml
```
# /var/www/nanospace/server/config/database.yml
default: &default
  adapter: mysql2
  encoding: utf8mb4
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  socket: /var/run/mysqld/mysqld.sock

production: &production
  adapter: mysql2
  database: nanospace_p
  password: <PRODUCTION_PASSWORD>
  username: nanospace
  reconnect: true
  pool: 5
  encoding: utf8

cable:
  <<: *production

queue:
  <<: *production

cache:
  <<: *production


```

* config/storage.yml

```
# /var/www/nanospace/server/config/storage.yml
test:
  service: Disk
  root: <%= Rails.root.join("tmp/storage") %>

local:
  service: Disk
  root: <%= Rails.root.join("storage") %>

```

* config/master.key and config/credentials.yml.ence
- Both files should already exist in /var/www/nanospace/server/config/


## 13. At this point, everything except for the database to login/signup and save scores should be working once you start up the server.

 
## 14. It is heavily recommended that once you have a URL for your site that you upgrade to HTTPS, as otherwise user passwords are sent in the clear. This is done by adding appropriate SSL certificates to the Apache2 config folder and adding the appropriate modifications to the Apache2 site config file (e.g. change to port 443, add SSL Engine On, add the paths to the SSL certificates, etc.) If your URL is controlled by your instituion, you may have to work with your IT department or the relevant sysadmin to have appropriate SSL certificates issued.