Title: Writing Blog Articles with Pelican in Markdown
Date: 2015-12-27 08:00
Tags: pelican, markdown
Category: Tech
Slug: writing-blog-articles-with-pelican-in-markdown
Summary: step-by-step guide on publishing articles written in Markdown language on a Pelican-based static single page blog site hosted on Github Page

After [installing Pelican to generate your static single page blog site](https://guizishanren.com/guide-to-set-up-github-page-and-pelican), I follow the below steps to write my blog articles.

## Learn Markdown language with an editor

As of 2015, I almost write exclusively with Markdown language. For work on [Linkqlo](https://linkqlo.com), I write on issue trackers and wiki pages on our internal [Gitlab-based](https://gitlab.com/) server. For my day-to-day journal, I write on [DayOne App](http://dayoneapp.com/). For personal blog [the Good, the Bad, and the Curious](http://guizishanren.com), it's in Markdown as well as it's hosted on [Github Page](https://pages.github.com/).

If something cannot be written in Markdown, I probably will not write it. This is one of the several reasons I stopped using Evernote a long time ago. 

Gitlab, Github, DayOne, and many other Markdown platforms all have their own flavored Markdown syntax. It could be confusing sometimes but [the basic syntax](https://daringfireball.net/projects/markdown/) is always the same.

Picking a good editor is a monumental and very personal decision for someone who truly respects his/her own writing. I've been using [MOU version 0.8.7](http://25.io/mou/) in the past few years. It's a fast editor with all the functions I need, like the trivial fun of switching color themes and a side-by-side live view window.

## Header format for blog articles

Every Pelican-based post should start with the below header format so that it can be recognized by Pelican and generated properly.

```
Title: My epic blog article
Date: 2015-12-25 08:00
Tags: Stanford, startup
Category: Tech
Slug: my-epic-blog-article
Summary: short version for index and feeds
```

**Title**, **Date** and **Slug** are must-haves. The rest are optional, which can be left blank if not needed. 

A post can have multiple tags but only one category. Think carefully how you want to organize your contents. Category is kind of more permanent and should be considered as an integral part of the article, as it's supported almost universally. Tags are nice-to-haves and may not be supported fully everywhere. Slug forms the URL of the post, so it's important to have a proper one for SEO (search engine optimization) purpose. Summary is the short snippet that is displayed beneath the link when the post pops up on Google search result. By Pelican default setting it will be the first paragraph (up to certain character length) of the post, if it's left blank.  It is always better to include at least some summary so that it's more search engine friendly.

## Commands for publishing a post

On command-line, enter into the path where the pelican folder is located

```
cd ~/path-to-your-blog-folder/pelican
```

Run a local simulation with Python 2.7 before pushing up the changes to Github Page

```
make html
cd output/
python -m SimpleHTTPServer
```
Now you can view the rendered pages on your local machine at [http://localhost:8000](http://localhost:8000)

Generate the post (in the root Pelican directory)

```
pelican content -o output -s pelicanconf.py
```

...and you'll see the below message:

```
Done: Processed 114 articles and 1 pages in 3.55 seconds.
```

Commit the change to the local repository

```
ghp-import -m "message" output
```

`ghp-import` is equivalent to `git commit`. Write something meaningful in the commit message, like "another epic post today when everyone is slacking off".

Push up the commit to Github Page

```
git push origin gh-pages
```

... and you'll see the below message:

```
Counting objects: 53, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (16/16), done.
Writing objects: 100% (53/53), 285.43 KiB | 0 bytes/s, done.
Total 53 (delta 47), reused 39 (delta 33)
To https://github.com/zire/blog.git
   c6c4e43..0e1d7b3  gh-pages -> gh-pages
```

Voila! There you go!