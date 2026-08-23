---
slug: change-syntax-highlight-with-pygments-CSS-for-Pelican-blog
title: Change Syntax Highlights with Pygments CSS for Pelican Site
tags: [tech,pelican,2015]
---

It's important to get the syntax highlight colors right. Here's my workflow to update that when I feel like a change.

<!--truncate-->

1. Find out which themes are already available from [pygments](http://pygments.org/docs/styles/) 

	>>> from pygments.styles import STYLE_MAP
	>>> STYLE_MAP.keys()
['monokai', 'manni', 'rrt', 'perldoc', 'borland', 'colorful', 'default', 'murphy', 'vs', 'trac', 'tango', 'fruity', 'autumn', 'bw', 'emacs', 'vim', 'pastie', 'friendly', 'native']

2. Check out the demo for various styles

[This site has a good gallery](http://help.farbox.com/pygments.html)

3. Generate a new pygments_XXX.css in `static/css/` folder under the specific theme directory, based on [Pelican's instruction](http://docs.getpelican.com/en/3.6.3/faq.html)

```bash
	$ pygmentize -S vim -f html -a .highlight > pygments_vim.css
```

4. Replace the current pygments.css with the new one

```bash
	$ cp pygments_monokai.css pygments.css
```

That's it. Now just deploy and push.
