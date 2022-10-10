Title: Set Up VPS on Linode - Part 3
Date: 2017-04-09 08:00
Category: Tech
Slug: set-up-VPS-on-Linode-part-3
Summary: Continuing from [Part 1](https://guizishanren.com/set-up-VPS-on-Linode-part-1) and [Part 2](https://guizishanren.com/set-up-VPS-on-Linode-part-2) about setting up VPS on Linode, here's the final episode on deployment from local repo to remote server with version control, and deploy on production instance.

Continuing from [Part 1](https://guizishanren.com/set-up-VPS-on-Linode-part-1) and [Part 2](https://guizishanren.com/set-up-VPS-on-Linode-part-2) about setting up VPS on Linode, here's the final episode on deployment from local repo to remote server with version control, and deploy on production instance.

## Create Group for Developers

List all the user groups on `apollo`:

	cut -d: -f1 /etc/group

Check the primary group for a user (`g` for primary):

	id -gn userjoe

Check all the groups for a user (`G` for secondary):

	id -Gn userjoe

Create a new group:
	
	groupadd developers

Add existing users to this new group:

	sudo usermod -aG developers userjoe
	sudo usermod -aG developers usersmith
	
## Create Git Repo on Production

On production instance `apollo`:

	cd /var
	sudo mkdir repo && cd repo
	sudo mkdir site.git && cd site.git
	
Change the ownership and group for `repo` folder in order to initialize git successfully

	sudo chown userjoe:developers /var/repo

sudo /home/herbertyang/.nix-profile/bin/git init --bare

There are probably a few more steps down the road. Between Stack Overflow and Digital Ocean, instructions are abundant and easily available.