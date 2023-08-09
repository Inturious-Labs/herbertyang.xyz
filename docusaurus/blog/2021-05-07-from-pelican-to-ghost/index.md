---
slug: move-blog-from-pelican-to-ghost
title: Migrating Blog From Pelican To Ghost
tags: [tech, journey]
image: "./img/1082_to_ghost.jpg"
---

Starting to blog again but changing from Pelican to Ghost

![writing](./img/1082_to_ghost.jpg)

<!--truncate-->

I've been blogging for about 15 years since the early days of blogger.com and mySpace. For the hours I spent in content creation, probably 80% went into the actual writing and at least 20% went into finding a good tool and fine-tuning it. While writing and sharing comes to me more or less naturally, it's been a continuous challenge and sometimes struggle to find the best blogging platform.

After blogger.com and mySpace got acquired and inevitably fizzled out, I started using Wordpress and hosted my blog on a VPS. Wordpress seemed easy enough with its famous 5-minute installation guide. Very quickly my Wordpress blog became bloated though. There are too many things under the MySQL hood that are hard to control. There are too many layers of frameworks that are convoluting and dependent on each other. Wordpress is still widely used today and proven very useful for users with little to no technical background, but I outgrew it a few years ago as I picked up Python and CSS from my startup days. I thought I could do more with my blog and didn't want to be constrained by Wordpress' limited functionalities. I switched into [Pelican](https://blog.getpelican.com/), a Python-based static site generator that enables writing in Markdown and generates static web pages. The next few years saw the biggest output of my blogging journey fueled by the simple and yet powerful Pelican. Embolden by my rudimentary knowledge of Python, I tinkered with all kinds of parameters in Pelican configuration file and developed a Git-based deployment workflow. It was streamlined, deterministic and elegant.

Yet my writing subsided significantly in the last 2-3 years and I wondered why. Maybe the work became too consuming? Maybe I was handicapped by my real-life persona? Or maybe I craved more from the audience and felt the good old blog has become too monotonous?

[Balajis](https://balajis.com/' recently launched [1729.com](https://1729.com/) was a wake-up call for me. In [A Newsletter That Pays You to Make Newsletters](https://1729.com/a-newsletter-that-pays-you-to-make-newsletters/), Balajis unabashedly proclaimed that:

>It's not obvious, but if you want to live forever you should start a newsletter ... That'll mean technological progressives from around the world, running a thousand individual newsletters, constantly pushing for technology in general and reversing aging in particular, writing like their lives depended on it. In other words, blog or die!

It struck me that there is a major difference between a blog and a newsletter. While the line might be blurring and many use two notions interchangeably, a newsletter goes beyond just sharing what interests "me" the author as an aspiring hobby and strives to build an audience with vested shared interests in an interactive fashion. Ultimately it builds a narrative that supports the author or influencer's beliefs and values as traditional media companies gradually give way to the rise of decentralized self-media outlets. Also it's now possible to do pseudonymous monetization. In rear mirror I focused too much on getting things out of my chest rather than creating a two-way feedback loop with people that resonate with my ideas and perspectives. It's time for a change.

Once the conceptual positioning is clear, selecting the right platform is not difficult. Pelican can be integrated with [Mailchimp](https://mailchimp.com/) as well to send out newsletter. It can work with commenting tools like [Disqus](https://disqus.com/) too with no problem. It can support decent SEO effort. It can be integrated with Stripe too if I try hard enough, I guess. That being said, Pelican as a framework seems too simple to handle these tasks if not slightly inadequate. It generates a static web page fine and anything beyond that would take a lot more substantial effort that doesn't seem worth it. The community of Pelican bloggers hasn't grown that much in recent years either. Writing in Markdown used to be cool and novel, but that's now a standard feature in many blogging platforms or note-taking tools such as [Roam Research](https://roamresearch.com/#/app/inturious).

The choice was narrowed down to [Medium](https://medium.com/), [Substack](https://substack.com/) and [Ghost](https://ghost.org/). Medium was red hot a few years ago and sat on the tip of the pyramid in Silicon Valley's version of the new [Maslow's hierarchy of needs](https://en.wikipedia.org/wiki/Maslow's_hierarchy_of_needs) (along with driving a Tesla and meditation). It seemed that at one point everyone around me was writing on Medium. The paywall it introduced was a big turn-off though and I gradually moved away from reading articles behind its paywall. For a committed paying user it's probably still a good platform to discover good contents. But for writers, Medium owns the readers and determines who gets to read what in an utterly centralized fashion. Circa 2021, this feature along is sufficient to kill the incentive for an aspiring writer. If I'm going to spend that much effort creating my own content, I want to own my audience, 100%.

Having just raised [$65 million Series B with a valuation around $650 million](https://techcrunch.com/2021/03/30/is-substack-really-worth-650m/) in early 2021, Substack has become a dominant player in this space and attracted many celebrity writers, such as Bill Bishop of [Sinocism](https://sinocism.com/). Substack borrows the playbook what works well for Medium by removing all the heavy-lifting work (like Stripe integration and running a newsletter) for writers to allow them to focus on content creation. It goes one step further by allowing writers to own their mailing lists (Medium doesn't). For all these it charges a 10% fee from revenues collected from subscribers. It's probably good value for money for many writers, but I don't want to pay 10% for hosting my newsletter. I don't want to pay anything at all.

So it boils down to Ghost. It seems to be able to do all the things Substack does as well and offers a self-hosting option for those who are able to use its [open-sourced code on Github](https://github.com/TryGhost/Ghost) (37.4K stars). I'm already paying for VPS service from Linode and [hosting a Ghost blog](https://balajis.com/set-up-a-paid-newsletter-at-your-own-domain/) seems straight forward enough. This seals the deal for me.

I'll share more in later posts on hosting multiple Ghost blogs on a single VPS instance, selecting the best comment framework, and creating multiple [Commento](https://www.commento.io/) systems for different blogs on the same VM.  It's fairly quick to set up. There is a large variety of mobile-friendly themes to choose from. The integration with Stripe and Mailgun is walk in the park.

So far, writing on Ghost is a breeze. The journey continues.

Until next time.