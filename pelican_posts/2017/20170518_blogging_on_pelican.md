Title: Blogging On Pelican
Date: 2017-05-18 08:00
Tags: pelican
Category: Tech 
Slug: blogging-on-pelican
Summary: I've come to really enjoy Pelican since moving my [personal blog](https://guizishanren.com) from wordpress to static site generator [Pelican](https://blog.getpelican.com) on a Github Page in 2014. It's not the easiest thing [to set up in the beginning](https://guizishanren.com/guide-to-set-up-static-blog-site-on-github-page-and-pelican/) and it took me months in countless iterations to settle down a well-tuned configuration that met my needs. The end-game is very satisfying though. 

I've come to really enjoy Pelican since moving my [personal blog](https://guizishanren.com) from wordpress to static site generator [Pelican](https://blog.getpelican.com) on a Github Page in 2014. It's not the easiest thing [to set up in the beginning](https://guizishanren.com/guide-to-set-up-static-blog-site-on-github-page-and-pelican/) and it took me months in countless iterations to settle down a well-tuned configuration that met my needs. The end-game is very satisfying though. 

I don't have to deal with wordpress' imperative process of installing and configuring third-party plugin any more - everything in Python-based Pelican is declarative. I don't have to worry about stumbling upon sleazy plugins with security vulnerabilities - static site generator is much more secured with much lower risk. I don't have to worry about constantly backing up wordpress posts through MySQL - Github Page will take care of the version control for a Pelican site. Last but not the least, I have absolute control in how I write - writing in Markdown removes the anxiety and uncertainty of displaying content in HTML. 

To make the most of this powerful tool, I've updated my workflow and configuration in several areas below.

## Markdown Editor

MOU used to be my go-to editor for Markdown. It was the best from the crowd, but from a low bar environment. It was strangely slow after in use for a while. The author for this tool has moved on to other personal projects and at one point tried to sell the source code to others. In any case, MOU is no longer being actively maintained.

[Macdown](https://macdown.uranusjr.com) is a very good replacement to MOU. It was heavily influenced by MOU, but has taken the editor thing to a whole new height. It's got very fast HTML preview rendering. Its Markdown engine seems to work well with all the major git service provides, from Gitlab, Github to Gitbucket. 

## Working with Images

The recommended configuration for a Pelican site usually has Github Page as the hosting server. It's probably good enough for most users, but with one caveat. Github Page has a **1 GB** size limit for its repos and as a git server, is not the best tool to handle binary file like images. This turns out to be a major challenge for my blog.

I have many images in my blog articles. Sometimes I simply create a gallery-like post with 10 images of the same theme, like [Here's Looking At You](https://guizishanren.com/heres-looking-at-you/) and [In Haste 匆匆](https://guizishanren.com/in-haste/). Embedding an image into a markdown file on a git server, boy, is a tricky business.

My goal is to maintain a declarative dependency source folder for all the images, like a *static/css* kind of folder, with a straightforward reference link in the related markdown files/posts. 

Wordpress handles this in a rather clumsy way by dumping all images into a separate system folder and rely on MySQL to establish the link connecting articles with images. Most if not all the prevailing "cloud"-based services like Box, Dropbox, Google Drive, One Drive, iCloud and Day One use *drag-n-drop* method to add images to a file. The path is hidden from user and a simple reference such as `../img/my-great-image.jpg` in the file would not work. The peril of the conventional drag-n-drop method lies in its imperative nature. It's very difficult to figure out exactly which image is embedded in which file, when you have to migrate a few hundred blog articles with hundreds of photos, as I did a few years ago. Not even Github can handle this gracefully. There are [hacky ways to do this](http://stackoverflow.com/questions/10189356/how-to-add-screenshot-to-readmes-in-github-repository), but they ain't pretty. 

Another challenge is the storage of all the images. Github repo is not the ideal place for binary files. Two common choices are Flickr and Amazon S3.

I have been a very early user of Flickr. For many years, I used Flickr as the ultimate one-stop depository of all my images, especially the ones for my blog. It has a simple enough process to upload photos, generate links, and enable users to embed links into HTML/markdown files. There are two major problems of Flickr though. 

First, it's part of Yahoo, aka, the most famous sinking ship in Silicon Valley. So let's just get the hell out of there. It's been fun Flickr, but all things come to an end. I'm surprised you're survived this long already in Yahoo.

Second, it generates a special hashed link for the image. This is troublesome. It means that if I move my contents elsewhere, I'll lose this Flickr-specific link and have to establish the connection between the file and the image from scratch. 

The second problem also makes me reluctant to replace Flickr with Amazon S3, as S3 uses a similar process to generate an S3-specific link for the image. I don't want these images to carry any platform-specific hash code/format of any kind. I will be held hostage by those platforms. The reference link to the image has to be at the **file level** and defined only by a relative path and the file name, nothing more.

One way to tackle this is just to host your own server, then you can set up file folders however you want. That's my solution. I used to think it must require a lot of technical work to set up your own server, but I have done that multiple times by now and it's quite doable, as explained in [Set Up VPS on Linode - Part 1](https://guizishanren.com/set-up-VPS-on-Linode-part-1/) and [Set Up VPS on Linode - Part 2](https://guizishanren.com/set-up-VPS-on-Linode-part-2/). 

A few months ago I moved away from Github Page and opened a new instance on Linode to host this blog. Linode's lowest tier for Virtual Private Server (VPS) charges only $5/month. It's been working pretty well.

## Pelican Post Template

```
Title: My sensational title
Date: 2018-01-01 08:00
Tags: fun, 中文
Category: Tech
Slug: my-super-post
Summary: Short executive summary for your article

This is the content of my super blog post.
```

## Workflow Revisited

One thing that will be too much of an overkill for VPS is git's version control. I can probably set up [Gitlab](https://github.com) on Linode's VPS to emulate the same workflow from Github Page, but that's too much work, even for me. 

There are two things in a Pelican-based blog that we might want to have version control on: 1) Pelican configuration; 2) posts and articles. When I look back into my own experience on Pelican in the last few years, I feel it's much more important to version control the configuration, and not so much for the individual posts. My commit message for new posts is as boring and plain as it gets, because there are only so much you can spin on "new post!". 

The legacy setup with Github Page leaves me with only one branch `gh-pages` as that's required by Github Page for a static site generator to work.

I created a `master` branch and include the following in `.gitignore` so that this branch will only capture changes in Pelican configuration, and not the content change.

```
.DS_Store
*.pid
content
cache
drafts
images
node_modules
npm-debug.log
output
*.pyc
```

For the old `gh-pages` branch, it can actually be deleted now, but I just leave it there and not do any more git add/commit/push. I stay on `master` branch and make changes to Pelican configuration (themes/CSS/pelicanconf.py, etc). I git add/commit/push changes to the `master` branch locally and to the remote Github server, so that visitors will get to see [my Pelican configuration](https://github.com/zire/pelican) easily. 

For the posts, I no longer git push them to `gh-pages => Github Page`. I think it should be sufficient. All my local files on my Macbook Pro are backed up through Time Machine on a Synology server, which is backed up to Amazon S3 regularly. The version control of my blog posts is much less meaningful than a change in a configuration anyway.

I have created two alias in `.bashrc` to work with Pelican more efficiently day to day:

```
alias generate="pelican content -o output -s pelicanconf.py"
alias publish="rsync -avhP --delete output/ joe@groot:/var/www/guizishanren.com/public_html/"

```

The first one is the standard command from Pelican to render everything in `/content` folder into HTML files based on the configuration set forth in `pelicaonconf.py`. The second one uses `rsync` to create a mirrored instance on the Linode VPS that will be immediately effective on https://guizishanren.com.

These two commands should be executed from the root directory for the Pelican site:

`/path/to/your/blog/pelican`

One more thing, when embedding images, use the HTML tag **\<img>** and don't use `![image](../path/to/image.jpg)`. Even though the latter works fine on local machine's editor (Macdown), it would not work on the server production environment. The syntax is:

`<img src="../images/YYYYMMDD_xxx_01.jpg" />`

To preview the changes, after `output/` directory has been regenerated with command `generate`,

The simple way:

```
chrome output/index.html
```

This simple method can review individual files, but doesn't sync up all the files holistically.

The complete way is to preview on a local Python server: 

```
cd output
python -m SimpleHTTPServer
Serving HTTP on 0.0.0.0 port 8000 ...
```

Open [0.0.0.0:8000](http://0.0.0.0:8000) to review the Pelican site and follow through with all the links.

Nothing beats the joy of writing things in an elegant and foolproof flow knowing you have total control of how your words and images are rendered 100% to your specification and perceived as such by others. With trial and error, I seem to have finally achieved that with Pelican.