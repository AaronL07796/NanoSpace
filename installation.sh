#!/bin/bash
# filepath: install_nanospace.sh
# Usage: sudo bash install_nanospace.sh /var/www/your_application

set -e

APP_PATH=${1:-/var/www/nanospace}
RAILS_DIR="$APP_PATH/server"

echo "=== Updating package lists..."
sudo apt update

echo "=== Installing Apache2..."
sudo apt install -y apache2

echo "=== Installing MySQL server and SQLite3..."
sudo apt install -y mysql-server sqlite3

echo "=== Installing Ruby and RubyGems..."
sudo apt install -y ruby-full

echo "=== Installing Rails gem..."
sudo gem install rails

echo "=== Creating app directory at $APP_PATH..."
sudo mkdir -p "$APP_PATH"
cd "$APP_PATH"

echo "=== Creating new Rails application in 'server' directory..."
sudo rails new server

echo "=== NOTE: Manually update the Gemfile to include the following gems:"
echo "    - rails"
echo "    - hike"
echo "    - authlogic"
echo "    - sqlite3"
echo "    - mysql2"
echo "    - passenger"
echo "=== Then run: bundle install"
read -p "Press Enter to continue after completing the above step..."

echo "=== Replacing generated /public and /app folders with provided versions..."
# You should add logic here to copy from your source, e.g.:
# cp -r /path/to/provided_app/* "$RAILS_DIR/app/"
# cp -r /path/to/provided_public/* "$RAILS_DIR/public/"

echo "=== Reminder: Make sure the following routes are in config/routes.rb:"
echo "    get 'login', to: 'sessions#new'"
echo "    post 'login', to: 'sessions#create'"
echo "    get 'signup', to: 'users#new'"
echo "    post 'signup', to: 'users#create'"

echo "=== Set up MySQL user and database (optional, can be done via mysql CLI)..."

echo "=== Setting up Passenger (manually)"
echo "    - Install Passenger via gem if not yet installed"
echo "    - Add Apache configuration similar to:"
cat <<EOF
<VirtualHost *:80>
    ServerName your.domain.name

    DocumentRoot $RAILS_DIR/public
    PassengerRuby /usr/bin/ruby

    <Directory $RAILS_DIR/public>
        Allow from all
        Options -MultiViews
        Require all granted
    </Directory>
</VirtualHost>
EOF

echo "=== Check for outdated Ruby code (e.g., before_filter → before_action)"
echo "=== Make sure config/database.yml, storage.yml, credentials.yml.enc, and master.key are valid."

echo "=== If porting from a recent VM, some steps may be skipped."

echo "=== OPTIONAL: Enable HTTPS by updating Apache config and adding SSL certs"

echo "=== DONE: Start your Rails app and Apache2 server to test functionality"
