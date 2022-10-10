Title: Basic Shell/Unix Commands
Date: 2017-11-26 08:00
Category: Tech
Slug: basic-shell-unix-commands
Summary: I get rusty from time to time and need a quick tutorial to get myself back into the tech game. This reference doc is fairly basic but saves me the trouble of having to google (which doesn't work in China) other reference websites or Stackoverflow. 

I get rusty from time to time and need a quick tutorial to get myself back into the tech game. This reference doc is fairly basic but saves me the trouble of having to google (which doesn't work in China) other reference websites or Stackoverflow. 

## Create A New File

Create an empty file with just a file name, use `touch`

```
touch README.md
```

## Find A File or Directory

Find a file or directory in the current path, use `find`

```
find . -name 'README.md' 
```

Find a file that contains a string `abc` in its name in the current path recursively

```
find . -name "*abc*"
```

## Find Strings

Find files that contain string `abcdef` in their content, use `grep` as suggested by this [Stack Overflow answer](https://stackoverflow.com/questions/16956810/how-do-i-find-all-files-containing-specific-text-on-linux)

```
grep -rnw 'path/to/somewhere' -e 'abcdef'

~/sites/guizishanren/pelican 14:24 [35] zire@guizishan $ grep -rnw . -e "COVER_IMG_URL"
./pelicanconf.py:20:COVER_IMG_URL = 'https://s3-us-west-2.amazonaws.com/guizishanren/img/shinjuku.jpg'
./themes/pure-single/README.md:9:* `COVER_IMG_URL` - Set the sidebar image (Optional).
./themes/pure-single/templates/base.html:43:            <div class="cover-img" {% if COVER_IMG_URL -%}
./themes/pure-single/templates/base.html:44:                style="background-image: url('{% block sidebar %}{{ COVER_IMG_URL }}{% endblock %}')"
```

Or a simpler grep

```
grep -Ril "abcdef" .

~/sites/guizishanren/pelican 14:34 [36] zire@guizishan $ grep -ril 'COVER_IMG_URL' .
./content/2017/20171125_basic_shell_unix_commands.md
./pelicanconf.py
./pelicanconf.pyc
./themes/pure-single/README.md
./themes/pure-single/templates/base.html
```

## Check Directory Size

Use `du` to find out the size of a directory `pelican`

```
du -sh pelican
```

To find out the size of each subdirectory in `pelican`

```
du -h pelican
```

## Remove Directory

```
rm -rf mydirectory
```

## Use PATH Variable

Display current PATH

```
echo $PATH
```

Add a new path to system variable PATH

```
export PATH=/usr/local/mysql/bin:$PATH
```

## Download File

```
curl -O some_URL_address_for_download_file
```

## Copy File Between Server and Local Machine

From server to local

```
scp xx.xx.xx.xx:some_directory/some_file_name .
```

From local to server

```
scp some_file_name xx.xx.xx.xx:some_directory/
```

Use rsync is arguably a superior way of doing just the same

```
rsync -avP some_file_name xx.xx.xx.xx:some_directory/
rsync -avP xx.xx.xx.xx:some_directory/some_file_name .
```

## Use Nix as Package Manager

Install Nix

```
curl https://nixos.org/nix/install | sh
```

Upon `Installation finished!`, follow the on-screen instruction:

```
. /home/userjoe/.nix-profile/etc/profile.d/nix.sh
```

Search for a package `mySQL` on Nix

```
nix-env -qa | grep mysql
```

Install the package

```
nix-env -i mysql-5.7.17
```

or 

```
nix-env --install mysql-5.7.17
```

Uninstall the package

```
nix-env --uninstall mysql-5.7.17
```

or

```
nix-env -e mysql-5.7.17
```

Open help

```
nix-env --help
```

To show installed packages

```
nix-env -q
```

To show available packages

```
nix-env -qas
```

## Display CHMOD Permission in Number Format

```
ls -l | awk '{k=0;for(i=0;i<=8;i++)k+=((substr($1,i+2,1)~/[rwx]/) \
*2^(8-i));if(k)printf("%0o ",k);print}'
```