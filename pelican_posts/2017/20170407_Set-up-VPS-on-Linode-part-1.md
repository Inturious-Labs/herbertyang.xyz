Title: Set Up VPS on Linode - Part 1
Date: 2017-04-07 08:00
Tags: devops
Category: Tech
Slug: set-up-VPS-on-Linode-part-1
Summary: Recently I had to set up virtual-private-server (VPS) for both my personal blog [the Good, the Bad, and the Curious](https://guizishanren.com) and [Linkqlo's website](https://linkqlo.com). Here is my workflow to set up *Ubuntu* Linux, *Apache* server and the server environment on Linode, which is one of the more popular VPS service providers along with Digital Ocean.  [Linode's Getting Started Guide](https://www.linode.com/docs/getting-started) is a helpful reference for the basics. 

Recently I had to set up virtual-private-server (VPS) for both my personal blog [the Good, the Bad, and the Curious](https://guizishanren.com) and [Linkqlo's website](https://linkqlo.com). Here is my workflow to set up *Ubuntu* Linux, *Apache* server and the server environment on Linode, which is one of the more popular VPS service providers along with Digital Ocean.  [Linode's Getting Started Guide](https://www.linode.com/docs/getting-started) is a helpful reference for the basics. 

## Activate New Instance on Linode

Pick Linode's cheapest VPS tier **Linode 1024** at $5/month with 20GB storage, 1 CPU Core and 1TB XFER. 

Choose a location. I just go with **Fremont, CA**, which is the closest one from where I live. When a new instance is created, it will get assigned an IP address. Its server status is `Brand New`.

Enable backup for $2/month. Pick a weekly backup window of **0200-0400** on every **Sunday**.

On Dashboard, deploy an image to choose a Linux distribution of **Ubuntu 16.04 LTS**. By default, the largest available space will be allocated. Enter **20224** MB for Deployment Disk Size and **256** MB for Swap Disk. Pick a strong root SSH password. Server status now reads: `Powered Off`.

Click **Boot** to turn on the instance. Server status is now changed to `Running`.

When a new instance is created, it will have a random serial number. Go to **Dashboard/Settings/Display Settings** to change it to a more meaningful name (save your Greek mythology vocabulary for later use, not here).

## Set Up SSH Access

I use [iTerm2](https://www.iterm2.com) on MacBook in place of the default Terminal.app from OSX. 

My current favorite color theme is **Arthur**, which can be downloaded from [iTerm2 Color Theme Collection](http://iterm2colorschemes.com).

Go to Linode's Dashboard, pick the newly created instance, go to tab **Remote Access**. Note down the public IP address in IPv4 format. Say, it's 12.34.56.78.

Log in for the first time as root

	ssh root@12.34.56.78

Answer `yes` when prompted for continuing connecting to this new host, where authenticity cannot be established yet. After 12.34.56.78 is permanently added to the list of known hosts, the connection will be closed.

SSH as root again, with password this time:

	ssh root@12.34.56.78

Upon successful login, Ubuntu's welcome message will be displayed, displaying it's on 16.04.2 LTS distribution.

## Add New Sudo User

[Digital Ocean's Guide](https://www.digitalocean.com/community/tutorials/how-to-add-and-delete-users-on-ubuntu-16-04) is a helpful starting reference.

As `root` user,

	adduser userjoe

Provide answers to complete creating `userjoe`:

- Password
- Full Name (optional)
- Room Number (optional)
- Work Phone (optional)
- Home Phone (optional)
- Other (optional)

Grant this new user sudo privilege,

	usermod -aG sudo userjoe

Check all current users with **sudo** privileges:

	getent group sudo

Provide the following info to user `usejoe`:

```
IP:				12.34.56.78
Username: 		userjoe
Password:		joespassword
``` 

Test the new user login. Logout from `root`, then login as `userjoe` with the assigned password.

	ssh userjoe@12.34.56.78
	
Once sudo user `userjoe` is created, it's better to complete the rest of the server setup with `userjoe` (by using `sudo` command) rather than `root`.  Login with `root` should be limited to the minimum.

To disallow root logins over SSH, as `userjoe`,

	sudo vim /etc/ssh/sshd_config

Set the following from `yes` to `no`:

	PermitRootLogin no

## Configure Server Environment

### Set Hostname

The server prompt is originally something like:

	userjoe@li331-187:~$

That's not very sexy. Time to set an interesting hostname for the instance. Go with something memorable and unique, like planets, philosophers, animals, or greek gods. 

Here's a helpful [list of greek gods and goddesses, and what they represent](http://www.gods-and-monsters.com/list-of-greek-gods-goddesses.html).

As `userjoe`, set hostname to `apollo`,

	sudo hostnamectl set-hostname apollo

Log out and log in back again. The prompt now reads:

	userjoe@apollo:~$


	
### Set Local Time

By default, Linux's image will be set to UTC time (Greenwich Mean Time). Change this to the local server time with:

	sudo dpkg-reconfigure tzdata

Pick **US** and **Pacific-New**,

	Current default time zone: 'US/Pacific-New'
	Local time is now:      Fri Apr  7 21:51:25 PDT 2017.
	Universal Time is now:  Sat Apr  8 04:51:25 UTC 2017.

## Set Up Passwordless SSH Login

Generate public and private SSH keys on the local machine (or your local server, or whatever server you use as the entry point to SSH into other realms):

	ssh-keygen

The key pair will be generated and saved in `~/.ssh` as:

- id_rsa
- id_rsa.pub

Copy the public key to server `apollo` using SSH:

	cat ~/.ssh/id_rsa.pub | ssh userjoe@12.34.56.78 "mkdir -p ~/.ssh && cat >>  ~/.ssh/authorized_keys"

## Configure SSH

On the local machine, edit the SSH configuration file:

	vim ~/.ssh/config

Add this entry to the file:

	host apollo
		HostName 12.34.56.78
		User userjoe
	
Now, instead of using the clumsy `ssh userjoe@12.34.56.78`, 

	ssh apollo

## Set Up Personal Dotfiles

**Git** is needed to install [my personal dotfiles](https://github.com/zire/dotfiles). While the usual recommended way (like from Github) for Ubuntu is to:

	apt-get install git

I'd prefer to install git with [Nix Package Manager](https://nixos.org/nix) after being brainwashed by [PL](https://thev.net). In the ocean of package managers, from brew to macport to pip to anaconda, Nix seems to stand in a league of its own and is superior in many ways. [Check out Hacker News' Nix as OS X Package Manager](https://news.ycombinator.com/item?id=11772686).

	curl https://nixos.org/nix/install | sh

Upon `Installation finished!`, follow the on-screen instruction:

	. /home/userjoe/.nix-profile/etc/profile.d/nix.sh

Search for **git** on Nix:

	nix-env -qa | grep git

Install git (the latest stable release version will be installed automatically):

	nix-env -i git
	
Now, follow my own [dotfile workflow](https://github.com/zire/dotfiles) to port my Linux configurations to this new server `apollo`. Run this to refresh:

	source .bashrc

Now my server prompt on `apollo` reads:

	~ 22:27 [12] userjoe@apollo $
	
...which is consistent with every other server environment I use. Peace. You feel me?

This concludes Part 1 of "Setting Up VPS on Linode". In Part 2, I'll lay out steps for:

- Configure DNS
- Install Apache
- Set up Apache's Virtual Host File
- Configure SSL encryption
- Set up mySQL
- How to deploy from local to remote live instance with Gitlab
- How to deploy wordpress automatically (tricky business...still working through it).

Please proceed to [Setting Up VPS on Linode - Part 2](https://guizishanren.com/set-up-VPS-on-Linode-part-2).