#!/bin/bash
# filepath: install_nanospace.sh

# Usage: sudo bash install_nanospace.sh /var/www/your_application

set -e

APP_PATH=${1:-/var/www/nanospace}

echo "Updating package lists..."
sudo apt update

echo "Installing Apache2..."
sudo apt install -y apache2

echo "Installing MySQL server and SQLite3..."
sudo apt install -y mysql-server sqlite3

echo "Installing Ruby and RubyGems..."
sudo apt install -y ruby-full

echo "Installing Rails gem..."
sudo gem install rails hike authlogic sqlite3 mysql2 passenger

echo "Navigating to $APP_PATH"
sudo mkdir -p "$APP_PATH"
cd "$APP_PATH"

echo "Creating new Rails app in 'server' directory..."
sudo rails new server

echo "Edit the Gemfile to include: rails, hike, authlogic, sqlite3, mysql2, passenger"
echo "Then run: bundle install"
echo "Replace /public and /app folders with your provided versions after bundle install."