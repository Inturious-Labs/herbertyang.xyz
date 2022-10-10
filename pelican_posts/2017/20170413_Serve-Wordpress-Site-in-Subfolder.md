Title: How to Serve Wordpress Site from Subdirectory
Date: 2017-04-13 08:00
Tags: wordpress, devops
Category: Tech
Slug: Serve-Wordpress-Site-From-Subdirectory
Summary: [Wordpress](https://codex.wordpress.org/Installing_WordPress) by default is installed in the root directory `var/www/abc.com/public_html`. This causes a lot of inconvenience as often we need to install other files into separate subdirectories under root directory. A good installation practice should keep every project in its own subdirectory.

[Wordpress](https://codex.wordpress.org/Installing_WordPress) by default is installed in the root directory `var/www/abc.com/public_html`. This causes a lot of inconvenience as often we need to install other files into separate subdirectories under root directory. A good installation practice should keep every project in its own subdirectory.

Many people try to do this in various ways. Due to different end goals, all these guides and tutorials lead to varied results that don't quite suit my needs. 

Here's what I need to accomplish:

The wordpress files will be served from URL `https://abc.com` from subdirectory `var/www/abc.com/public_html/wordpress`. All the post URLs should preserve the original format as `https://abc.com/my-great-blog-post`, which is crucial for SEO (wrong setup would change URL to `https://abc.com/wordpress/my-great-blog-post`). 

Also, other projects should be served from their own subdirectories in root without being affected. For example, `https://abc.com/lalaland` will be served from URL `https://abc.com/lalaland` from subdirectory `/var/www/abc.com/public_html/lalaland`. 

Through series of experiments, the below configuration is found to work for my goals perfectly.

## Move wordpress into its own subdirectory

Move all these wordpress core files from `var/www/abc.com/public_html` to `var/www/abc.com/public_html/wordpress`

```
index.php
license.txt
readme.html
wp-activate.php
wp-admin
wp-blog-header.php
wp-comments-post.php
wp-config-sample.php
wp-config.php
wp-content
wp-cron.php
wp-includes
wp-links-opml.php
wp-load.php
wp-login.php
wp-mail.php
wp-settings.php
wp-signup.php
wp-trackback.php
xmlrpc.php
```

## Create a .htaccess in the root directory

First we need to set up .htaccess to preserve the URLs in the right format. Apache's **rewrite** module can achieve this.

Create a .htaccess file in the root directory `/var/www/abc.com/public_html`:

```
cd /var/www/abc.com/public_html
vim .htaccess
```

Copy and paste this into the file

```
# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>

# END WordPress
```

Check the apache configuration to make sure this module is installed:

```
cd /etc/apache2/mods-enabled/
```

If it's not there, enable it and restart apache

```
sudo a2enmod rewrite
sudo service apache2 restart
```

[Wordpress has an official guide on how to edit this .htaccess in root](https://codex.wordpress.org/Giving_WordPress_Its_Own_Directory). It's different from the one I use above though. Not sure if it'll serve the same purpose. I'll stick with mine that's proved to work.

## Copy index.php into the root directory

Now we need to load up wordpress files from the root directory. 

```
cd /var/www/abc.com/public_html
cp wordpress/index.php .
```

Add a `wordpress` (the name of the subdirectory for wordpress files) into the last line of this file. After the edit, this file should look like this (comments removed for cleaner display):

```
<?php
define('WP_USE_THEMES', true);
require( dirname( __FILE__ ) . '/wordpress/wp-blog-header.php' );
```

## Define SITEURL in wp-config.php

Add these two lines into `wordpress/wp-config.php`

```
/** Set wordpress directory path and site url */
define('WP_HOME', 'https://abc.com');
define('WP_SITEURL', 'https://abc.com/wordpress');
```

That should do the trick. To see a live demo, take a look at:

[linkqlo.com](https://linkqlo.com) (wordpress-based)

and

[linkqlo.com/mirror](https://linkqlo.com/mirror) (jQuery-based).