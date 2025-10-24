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
