Title: Set Up Subdomain Website Hosted on VPS with Git Deployment
Date: 2018-04-16 08:00
Tags: 
Category: Tech
Slug: set-up-subdomain-website-on-vps-with-git-deployment
Summary: The previous series **Set Up VPS on Linode** ([Part 1](https://guizishanren.com/set-up-VPS-on-Linode-part-1), [Part 2](https://guizishanren.com/set-up-VPS-on-Linode-part-2), [Part 3](https://guizishanren.com/set-up-VPS-on-Linode-part-3/)) explains how to set up the server environment with necessary dependencies on a Linode VPS virtual machine. This article takes one step further to lay out the steps to launch a new website from this virtual machine with git-based deployment. 

The previous series **Set Up VPS on Linode** ([Part 1](https://guizishanren.com/set-up-VPS-on-Linode-part-1), [Part 2](https://guizishanren.com/set-up-VPS-on-Linode-part-2), [Part 3](https://guizishanren.com/set-up-VPS-on-Linode-part-3/)) explains how to set up the server environment with necessary dependencies on a Linode VPS virtual machine. This article takes one step further to lay out the steps to launch a new website from this virtual machine with git-based deployment. 

## Basic parameters

VPS provider: `Linode`

Existing website: `mysite.com`

IP for existing website: `12.34.56.78`

New subdomain under existing website: `newsite.mysite.com`

Server for the virtual machine: `Apache`

Username on the server: `user000`

Local working directory: `~/Sites/newsite`

## 1. Configure DNS

First we need to create a working URL for the new website, which is a subdomain under an existing website.

Login to Linode's dashboard. Go the right linode virtual machine => DNS Manager. 

In `A/AAAA Records` section, create a new `A` record. 

Hostname: `newsite`

IP Address: `12.34.56.78`

TTL: `default` or `300 (5 minutes)`

[http://newsite.mysite.com](http://newsite.mysite.com) will now point to the same virtual machine at IP address `12.34.56.78`. The Apache-based server needs to be configured to handle traffic from `newsite.mysite.com`. 

## 2. Set up working directory on server

Create the folders that will contain the files for the website

```
mkdir /var/www/newsite.mysite.com
mkdir /var/www/newsite.mysite.com/public_html
mkdir /var/www/newsite.mysite.com/log
mkdir /var/www/newsite.mysite.com/repo
```

Make sure the folders have the right ownership `www-data`, which is the default for apache:

```
chown -R www-data:www-data /var/www/newsite.mysite.com
chown -R user000:www-data /var/www/newsite.mysite.com/repo
chown -R user000:www-data /var/www/newsite.mysite.com/public_html
```

## 3. Configure virtual host on Apache

The traffic routing at the server side is accomplished with virtual host on Apache. My Linode is set up with Ubunto 16.04.02 LTS. 

ssh into the server, then,

```
cd /etc/apache2/sites-available`
cp 000-default.conf newsite.mysite.com.conf 
```

Open `newsite.mysite.com.conf` with vim, uncomment the following lines with these changes:

```
ServerName newsite.mysite.com
ServerAlias newsite.mysite.com
ServerAdmin webmaster@mysite.com
DocumentRoot /var/www/newsite.mysite.com/public_html
ErrorLog /var/www/newsite.mysite.com/log/error.log
CustomLog /var/www/newsite.mysite.com/log/access.log combined
```

Enable this new virtual host configuration file with `sudo a2ensite newsite.mysite.com.conf`

Restart the apache server so that the new virtual machine will take effect: `sudo service apache2 restart`

## 4. Set up git deployment

Login to Github's account, create a new private repo `newsite` with a README. It has a git address `git@github.com:username/newsite.git`

On **local machine** (Macbook Pro 2017), `cd ~/Sites`, then clone the git repo with `git clone git@github.com:username/newsite.git`.

Add a `.gitignore` file and some initial placeholder files like index.html. Make the initial commit with `git add .`, `git commit`, and `git push` to push the changes to remote `origin` on `master` branch.  

On **server on VPS**, create another remote for this local git repo.

```
cd /var/www/newsite.mysite.com/repo
mkdir site.git && cd site.git
git init --bare
cd hooks
touch post-receive
```

In vim, copy and paste the following code into the newly created hook `post-receive`, 

```
#!bin/sh

TARGET="/var/www/newsite.mysite.com/public_html"
GIT_DIR="/var/www/newsite.mysite.com/repo/site.git"
BRANCH="master"
BGREEN="\033[1;32m"
BYELLOW="\033[1;33m"
NC="\033[0m" # no color

while read oldrev newrev ref
do
	# only checking out the master branch
	if [[ $ref = refs/heads/$BRANCH ]];
	then
		echo -e "Ref $ref received. ${BGREEN}Deploying ${BRANCH} branch to production...${NC}"
		git --work-tree=$TARGET --git-dir=$GIT_DIR checkout -f
	else
		echo -e "Ref $ref received. ${BYELLOW}Doing nothing.${NC} Only the ${BRANCH} branch may be deployed on this server."
	fi
done
```

Back on the local machine, `cd ~/Sites/newsite`, add a new remote:

```
git remote add live zire@kratos:/var/www/newsite.mysite.com/repo/site.git
```

Check two remotes are now added to this local git repo with `git remote -v`

Deploy the code to VPS virtual machine with a simple `git push live`. 

## 5. Final Notes

There are various ways to do deployment from local machine to server. The ideal work flow is that changes are pushed to github's repo, which triggers a web hook from github to perform a Continuous Integration ("CI") action. This action will need to be completed through some third party SaaS and this web hook will push the changes from github to the virtual machine on VPS provider.  I feel this is too much work for a simple webpage project. 

Another method is to git push to multiple remotes, as suggested by very spirited discussions on Stack Overflow. I think this is also a bit of overkill. 

Some SO users also suggested that the second step (from github server to VPS) can be achieved by ssh into VPS, git pull the code from github. This works but involves too many manual steps. 

Alternatively, one can also just use `rsync -avP --delete localfile serverpath` to do the same work as `git push` from local machine/github to VPS. This is not so elegant. 

My approach is to manually run `git push` twice, first one to remote `origin`, and the second one to remote `live`. Two commands shall be executed right after each other to ensure the same code base is updated simultaneously on Github, which handles version control, and VPS, which serves the actual files to web audience. It's simple enough for a small project. 