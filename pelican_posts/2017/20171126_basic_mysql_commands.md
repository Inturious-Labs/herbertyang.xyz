Title: Basic MySQL Commands
Date: 2017-11-26 08:00
Category: Tech
Slug: basic-mysql-commands
Summary: My own quick reference guide for MySQL database

My own quick reference guide for MySQL database.

## Find Version

```
mysql --version
```

## Install MySQL

Install MySQL on Unix, follow [this guide from Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-14-04)

Download the current stable release dmg file from [MySQL's official developer site](https://dev.mysql.com/downloads/mysql/)

Open the dmg file, which unzip into a .pkg file, run the pkg file to install MySQL. A temporary password `xxxxx` will be created and displayed on screen for root@localhost. Note it down.

Go to OSX/System Preferences/MySQL, click the button `Start MySQL Server` to start the MySQL server. The status indicator will turn into `green` from `red`.

Login as root to change root password, first using the temporary password

```
mysql -u root -p
```

At this point, MySQL won't allow you to do anything without resetting the root password first. So let's do that (already logged into MySQL)

```
mysql> SET PASSWORD = PASSWORD('your_new_password');
```

Reload the privileges

```
mysql> flush privileges;
mysql> quit
```

## Main Usages

Show all the databases and use a database

```
mysql> show databases;
mysql> use some_database;
```

Show all the tables

```
mysql> show tables;
```

Describe a table;

```
mysql> describe some_table;
```

Update a user's password

```
mysql> use mysql;
mysql> update user set authentication_string=PASSWORD('your_new_password') where User='some_user';
mysql> flush privileges;
```

