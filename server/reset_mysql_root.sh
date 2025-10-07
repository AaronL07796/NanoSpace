#!/bin/bash
# Script to reset MySQL root password using --skip-grant-tables

set -e

# Prompt for new password
read -s -p "Enter new MySQL root password: " NEWPASS
echo

# Create socket directory if it doesn't exist
if [ ! -d /var/run/mysqld ]; then
  echo "Creating missing /var/run/mysqld directory..."
  sudo mkdir -p /var/run/mysqld
  sudo chown mysql:mysql /var/run/mysqld
fi

# Start MySQL in skip-grant-tables mode
echo "Starting MySQL in --skip-grant-tables mode..."
sudo mysqld_safe --skip-grant-tables &
MYSQLD_PID=$!

# Wait for MySQL to be ready
echo "Waiting for MySQL to start..."
sleep 8

# Run SQL to update root password
echo "Updating root password..."
mysql -u root <<EOF
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '$NEWPASS';
EOF

# Kill mysqld_safe background process
echo "Stopping temporary MySQL instance..."
sudo killall mysqld || true
sleep 3

# Restart MySQL normally
echo "Restarting MySQL service..."
sudo systemctl start mysql

echo "✅ MySQL root password successfully updated."
