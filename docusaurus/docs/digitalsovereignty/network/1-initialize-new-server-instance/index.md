---
title: Initialize a new server instance
description: How to create and configure a new Linux server instance
image: './img/genesis.jpg'
keywords: [server, instance, virtual machine, linux, ubuntu, ssh, rsa]
---

# Initialize A New Server Instance

Upon creating a new server on a remote machine by a VPS provider such as Linode or Digital Ocean, perform the following steps to initialize the server environment properly with the right admin access. 

## Set up SSH

Using [Linode](https://www.linode.com/) as an example, during the initialization of a new instance (say, `12.34.56.78`), Linode would require creating a root password. On local machine, login with user `root` for the first time.

```bash
ssh root@12.34.56.78
```

Answer `Yes` when prompted for continuing connecting to this new host from the local machine. After 12.34.56.78 is permanently added to the list of known hosts, the connection will be closed. Login again with root's password.

```bash
ssh root@12.34.56.78
```

Upon successful login, Ubuntu's welcome message will be displayed.

## Add new sudo user

On server, login as `root` user.

```bash
adduser userjoe
```

Provide answers to complete creating `userjoe`:

- Password (required)
- Full Name (optional)
- Room Number (optional)
- Work Phone (optional)
- Home Phone (optional)
- Other (optional)

Grant this new user sudo privilege.

```bash
usermod -aG sudo userjoe
```

Check all the current users that have sudo privileges.

```bash
getent group sudo
```

Test the login for the new userjoe. Log out from user root, then login as userjoe with the password.

```bash
ssh userjoe@12.34.56.78
```

It's better to use `userjoe` than `root`. 

:::caution
Login with root should be limited to the minimum
:::

Logged in as `userjoe`, disallow root login over SSH.

```bash
sudo vim /etc/ssh/sshd_config
```

Flag the following parameter from `yes`` to `no`.

```bash
PermitRootLogin no
```

## Set hostname

The initial server prompt is something like this:

```bash
userjoe@li331-187:~$
```

It can be changed into something more fun, like a greek god's name.

```bash
sudo hostnamectl set-hostname apollo
```

Log out and log in back again. The prompt now reads:

```bash
userjoe@apollo:~$
```

## Set local time

By default, Linux's image will be set to `UTC` time (Greenwich Mean Time). Change this to the local server time with:

```bash
sudo dpkg-reconfigure tzdata
```

Pick `US` and `Pacific-New`,

```bash
Current default time zone: 'US/Pacific-New'
Local time is now:      Fri Apr  7 21:51:25 PDT 2023.
Universal Time is now:  Sat Apr  8 04:51:25 UTC 2023.
```

## Set up passwordless SSH login

Generate public and private SSH key pair on the local machine (or your local server, or whatever server you use as the entry point to SSH into other remote machine).

```bash
ssh-keygen
```

:::tip
Do not use a passphrase
:::

Just click space bar twice to skip the creation of a passphrase.

The key pair will be generated and saved in `~/.ssh` as:

- `id_rsa_apollo`
- `id_rsa_apollo.pub`

Copy the **public** key to server apollo using SSH.

```bash
cat ~/.ssh/id_rsa_apollo.pub | ssh userjoe@12.34.56.78 "mkdir -p ~/.ssh && cat >>  ~/.ssh/authorized_keys"
```

:::danger
Do not ever copy private key to another remote machine
:::

## Configure SSH

On the local machine, edit the SSH configuration file.

```bash
vim ~/.ssh/config
```

Add this entry to the file

```bash
host apollo
    HostName         12.34.56.78
    User             userjoe
    IdentityFile     ~/.ssh/id_rsa_apollo
```

Now, instead of using the clumsy ssh userjoe@12.34.56.78, do this

```bash
ssh apollo
```

## Set personal preferences

On the server apollo, open up configuration file `.bashrc` and add a few lines for personal preferences. 

```bash
# use PS1 to change the format of the prompt
# PS1='[\u@\h \W]\$ '  # Default
# \A: the current time in 24-hour HH:MM: format
# \w: the current working directory
# \u: the username of the current user
# \#: the command number of this command
# \h: the hostname up to the first '.'
# display format = absolute path + time + command number + user@hostname
export PS1="\[\e[0;36m\]\w\[\e[m\] \[\e[0;33m\]\A\[\e[m\] \[\e[0;34m\][\#]\[\e[m\] \[\e[0;32m\]\u\[\e[m\]@\[\e[0;35m\]\h\[\e[m\] \[\e[0;37m\]$ \[\e[m\]"

alias lsl="ls -la | awk '{k=0;for(i=0;i<=8;i++)k+=((substr(\$1,i+2,1)~/[rwx]/)*2^(8-i));if(k)printf(\"%0o \",k);print}'"

alias rm="rm -i"
```

Then refresh the terminal instance for the new configuration to take effect.

```bash
source .bashrc
```

These are some of the most basic steps to initialize a new server instance for ease of use. Rock on!