通过修改hosts文件来使用Google和Gmail等相关服务 - 2011年9月
==========================================================

date
:   2011-09-18 19:22

author
:   admin

category
:   Internet\_互联网

tags
:   gmail, Hosts, 翻墙

slug
:   %e9%80%9a%e8%bf%87%e4%bf%ae%e6%94%b9hosts%e6%96%87%e4%bb%b6%e6%9d%a5%e4%bd%bf%e7%94%a8google%e5%92%8cgmail%e7%ad%89%e7%9b%b8%e5%85%b3%e6%9c%8d%e5%8a%a1-2011%e5%b9%b49%e6%9c%88

最近几天Gmail又不大稳定了，一怒之下，在网上搜到了个最全的hosts指令，立时原地满血复活，不管是Gmail,
Google.com，还是Plus,
Picasaweb，都可以正常访问了。在hosts文件下添加如下信息即可（起码适用于北京地区，大陆其他地区情况可能视当地运营商情况有异）。至于在Windows和Mac下如何修改，编辑hosts文件，参见此文[《如何通过修改Hosts文件不翻墙也可以访问Google+》](http://www.guizishanren.com/?p=683)。

    203.208.46.146 chrome.google.com
    203.208.46.146 clients0.google.com
    203.208.46.146 clients1.google.com
    203.208.46.146 clients2.google.com
    203.208.46.146 clients3.google.com
    203.208.46.146 clients4.google.com
    203.208.46.146 www.googleusercontent.com 
    203.208.46.146 lh0.googleusercontent.com
    203.208.46.146 lh1.googleusercontent.com
    203.208.46.146 lh2.googleusercontent.com
    203.208.46.146 lh3.googleusercontent.com
    203.208.46.146 lh4.googleusercontent.com
    203.208.46.146 lh5.googleusercontent.com
    203.208.46.146 lh6.googleusercontent.com
    203.208.46.146 lh7.googleusercontent.com 
    203.208.46.146 clients1.googleusercontent.com 
    203.208.46.146 clients2.googleusercontent.com
    ##网页快照
    203.208.46.146 webcache.googleusercontent.com
    ##Google SSL
    203.208.46.146 encrypted.google.com
    203.208.46.146 encrypted.google.com.hk
    ##Google Docs
    203.208.46.146 docs.google.com
    203.208.46.146 docs0.google.com
    203.208.46.146 docs1.google.com
    203.208.46.146 docs2.google.com
    203.208.46.146 docs3.google.com
    203.208.46.146 spreadsheets.google.com
    203.208.46.146 spreadsheets0.google.com
    203.208.46.146 spreadsheets1.google.com
    203.208.46.146 spreadsheets2.google.com
    203.208.46.146 spreadsheets3.google.com
    #Gmail
    203.208.46.146 mail.google.com
    203.208.46.146 mail-attachment.googleusercontent.com
    203.208.46.146 chatenabled.mail.google.com #Gmail中Gtalk聊天服务
    ##Google 搜索
    203.208.46.146 www.google.com
    ##Google preview
    203.208.46.146 www.googlepreview.com
    ##Google 翻译
    203.208.46.146 translate.google.com
    203.208.46.146 translate.googleapis.com
    ##Google 搜索建议（IE9）
    203.208.46.146 clients5.google.com
    ##Google code
    203.208.46.146 code.google.com
    ##Picasa 网络相册
    203.208.46.146 picasaweb.google.com
    203.208.46.146 lh0.ggpht.com
    203.208.46.146 lh1.ggpht.com
    203.208.46.146 lh2.ggpht.com
    203.208.46.146 lh3.ggpht.com
    203.208.46.146 lh4.ggpht.com
    203.208.46.146 lh5.ggpht.com
    203.208.46.146 lh6.ggpht.com
    203.208.46.146 lh7.ggpht.com
    203.208.46.146 lh8.ggpht.com
    203.208.46.146 lh8.ggpht.com
    203.208.46.146 lh9.ggpht.com
    203.208.46.146 lh6.google.com
    ##Google 个人资料
    203.208.46.146 profiles.google.com
    203.208.46.146 browsersync.google.com
    ##Google+
    203.208.46.146 talkgadget.google.com ##Google+中的聊天服务
    203.208.46.146 ssl.gstatic.com
    203.208.46.146 images-pos-opensocial.googleusercontent.com
    203.208.46.146 images1-focus-opensocial.googleusercontent.com
    203.208.46.146 images2-focus-opensocial.googleusercontent.com
    203.208.46.146 images3-focus-opensocial.googleusercontent.com
    203.208.46.146 images4-focus-opensocial.googleusercontent.com
    203.208.46.146 images5-focus-opensocial.googleusercontent.com
    203.208.46.146 images6-focus-opensocial.googleusercontent.com
    203.208.46.146 plus.google.com
    ##Download 下载
    203.208.46.146 dl.google.com
    203.208.46.146 dl-ssl.google.com
    ##Groups
    203.208.46.146 groups.google.com
    ##Google URL Shortener
    203.208.46.146 goo.gl
    ##Google app engine
    203.208.46.146 appengine.google.com
