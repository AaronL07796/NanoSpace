# NanoSpace Maintenance Guide

## Common Issues That Showed Up

### MySQL Server Issues

(run from VM server at /var/www/nanospace/server/public)
#### 1. Check if the service is supposed to be running

```bash
sudo systemctl status mysql
```

#### 2. Check for rogue or hidden MySQL processes

```bash
ps aux | grep mysql
```

#### 3. Monitor the error log in real-time (The most important step)

```bash
sudo tail -n 50 -f /var/log/mysql/error.log
```

### Common MySQL Errors and Solutions

#### Error 1: Socket Error (2) or (13)

**Symptoms:** Can't connect... through socket '/var/run/mysqld/mysqld.sock' (2).

**Cause:** The socket file is missing because the server is either not running or failed to start.

**Solution:**

1. **Check if Disk is Full:**

   ```bash
   df -h
   ```

   (MySQL won't start if 100% full)

2. **Check Permissions:**

   ```bash
   sudo chown -R mysql:mysql /var/lib/mysql /var/run/mysqld
   ```

3. **Attempt Restart:**
   ```bash
   sudo systemctl restart mysql
   ```

#### Error 2: InnoDB Unable to lock ibdata1 (Error: 11)

**Symptoms:** Error log shows "Unable to lock ./ibdata1 error: 11"

**Cause:** This happens when a previous MySQL process didn't shut down correctly and is still holding the file open, or multiple instances are trying to run.

**Solution:**

1. **Kill all MySQL processes:**

   ```bash
   sudo systemctl stop mysql
   sudo killall -9 mysqld
   ```

2. **Verify no processes remain:**

   ```bash
   ps aux | grep mysql
   ```

3. **Start MySQL:**
   ```bash
   sudo systemctl start mysql
   ```

#### Error 3: Identifying the "Maintenance Instance"

During an update, Ubuntu starts a temporary MySQL instance. You can identify this in the error log by looking for:

```
socket: '/tmp/tmp.XXXXXX/mysqld.sock' port: 0
```

**Rule:** If you see this in the logs, wait. The installer is performing a database upgrade.

**Action:** If it stays stuck for > 5 minutes, find that specific socket path in the log and force a shutdown:

```bash
sudo mysqladmin -u root -S /tmp/tmp.YOUR_SOCKET_PATH/mysqld.sock shutdown
```

#### Emergency "Clean Start" Routine

If everything is a mess, run this exact sequence:

```bash
sudo systemctl stop mysql
sudo killall -9 mysqld
sudo rm -rf /tmp/tmp.*
sudo dpkg --configure -a
sudo systemctl start mysql
```
