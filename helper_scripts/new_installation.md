# Deployment Guide for NanoSpace

### **Prerequisites**

  * A new, clean VM instance.
  * SSH access with a user that has `sudo` privileges.
  * Your project's `app` and `public` directories ready to be copied over.

-----

## \#\# 1. Install System Dependencies

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

## \#\# 2. Install Ruby on Rails

Next, install the Rails framework using RubyGems.

```bash
sudo gem install rails
```

-----

## \#\# 3. Create the Rails Application

Navigate to `/var/www/nanospace/` and generate the new Rails application.

  * **Run from**: `/var/www/www/nanospace/`
    ```bash
    # Create the Rails app inside a 'server' subdirectory
    sudo rails new server
    ```

-----

## \#\# 4. Configure Application Gems

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

## \#\# 5. Integrate NanoSpace Project Files

Replace the default folders with your project's versions.

1.  **Replace the folders**:
      * **Run from**: `/var/www/nanospace/server`
        ```bash
        
        # Use scp or another method to copy your project's app and public folders here.
        # After copying, set the correct ownership.
        sudo chown -R www-data:www-data /var/www/nanospace

        # if you want to replace / override the existing app and public first clean the directory
        # sudo rm -rf public
        # sudo rm -rf app
        # Then you can copy over from your local copy of the working copy of the github app and public folders 
        # from /NanoSpace/server/
        # scp public USER@nanotoon.cs.rpi.edu:/var/www/nanospace/server/
        # scp app USER@nanotoon.cs.rpi.edu:/var/www/nanospace/server/
        ```

-----

## \#\# 6. Generate Database Migrations

Create the migration files that define your database schema.

1.  **Generate the Main Models**:

      * **Run from**: `/var/www/nanospace/server`
        ```bash
        rails generate model User name:string crypted_password:string password_salt:string persistence_token:string atom_face:text
        rails generate model Game title:string label:string
        rails generate model Achievement title:string game:references label:string
        rails generate model Score user:references game:references score:integer misc:text
        rails generate model UserFlag user:references flag_key:string flag_value:string
        ```

2.  **Create the Join Table Migration**:

      * **Run from**: `/var/www/nanospace/server`
        ```bash
        rails generate migration CreateJoinTableAchievementUser
        ```

    Now, open the new migration file created in the `db/migrate/` directory and replace its `change` method with this:

    ```ruby
    def change
      create_join_table :achievements, :users
    end
    ```

-----

## \#\# 7. Set Up Phusion Passenger & Apache

Configure the Passenger application server to connect Apache to your Rails app.

1.  **Run the Installer**:

      * **Run from**: `/var/www/nanospace/server`
        ```bash
        sudo passenger-install-apache2-module
        ```

    Follow the on-screen instructions, which will require you to edit `/etc/apache2/apache2.conf` to add the `LoadModule` lines it provides.

2.  **Create the Apache Site File**:

      * **File Location**: `/etc/apache2/sites-available/nanospace.conf`
        ```bash
        sudo vim /etc/apache2/sites-available/nanospace.conf
        ```

    Add the following content:

    ```apache
    <VirtualHost *:80>
        ServerName your_domain_or_ip.com
        DocumentRoot /var/www/nanospace/server/public

        <Directory /var/www/nanospace/server/public>
            Allow from all
            Options -MultiViews
            Require all granted
        </Directory>
    </VirtualHost>
    ```

3.  **Enable the Site**:

      * **Run from**: Any directory
        ```bash
        sudo a2ensite nanospace.conf
        sudo systemctl reload apache2
        ```

-----

## \#\# 8. Configure and Run the Database

Create the MySQL database, configure Rails to connect to it, and then run the migrations you generated.

1.  **Create the MySQL Database and User**:

      * **Run from**: Any directory
        ```bash
        sudo mysql -u root -p
        ```

    In the MySQL shell, run these commands:

    ```sql
    CREATE DATABASE nanospace_production CHARACTER SET utf8 COLLATE utf8_general_ci;
    CREATE USER 'your_mysql_user'@'localhost' IDENTIFIED BY 'a_very_strong_password';
    GRANT ALL PRIVILEGES ON nanospace_production.* TO 'your_mysql_user'@'localhost';
    FLUSH PRIVILEGES;
    EXIT;
    ```

2.  **Configure `database.yml`**:

      * **File Location**: `/var/www/nanospace/server/config/database.yml`
        ```bash
        sudo vim /var/www/nanospace/server/config/database.yml
        ```

    **Delete all existing content** and replace it with this MySQL configuration. Update the `production` block with your actual username and password.

    ```yaml
    default: &default
      adapter: mysql2
      encoding: utf8mb4
      pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
      socket: /var/run/mysqld/mysqld.sock

    production:
      <<: *default
      database: nanospace_production
      username: your_mysql_user
      password: 'a_very_strong_password'
    ```

3.  **Run the Migrations**:

      * **Run from**: `/var/www/nanospace/server`
        ```bash
        RAILS_ENV=production sudo bundle exec rails db:migrate
        ```

-----

## \#\# 9. Secure Your Site with HTTPS (Final Step) OPTIONAL

Finally, configure SSL to encrypt traffic to your application.

1.  **Update Apache Site Configuration**:

      * **File Location**: `/etc/apache2/sites-available/nanospace.conf`
        ```bash
        sudo vim /etc/apache2/sites-available/nanospace.conf
        ```

    Replace the entire file contents with the following to force all traffic to HTTPS.

    ```apache
    # Redirect HTTP to HTTPS
    <VirtualHost *:80>
        ServerName your_domain_or_ip.com
        Redirect permanent / https://your_domain_or_ip.com/
    </VirtualHost>

    # SSL Configuration for HTTPS
    <VirtualHost *:443>
        ServerName your_domain_or_ip.com
        DocumentRoot /var/www/nanospace/server/public

        SSLEngine on
        SSLCertificateFile /path/to/your/certificate.crt
        SSLCertificateKeyFile /path/to/your/private.key

        <Directory /var/www/nanospace/server/public>
            Allow from all
            Options -MultiViews
            Require all granted
        </Directory>
    </VirtualHost>
    ```

2.  **Enable SSL and Restart**:

      * **Run from**: Any directory
        ```bash
        sudo a2enmod ssl
        sudo systemctl restart apache2

        ```
