Off The Wall (续）
==================

date
:   2011-06-02 01:25

author
:   admin

category
:   Internet\_互联网

tags
:   穿越

slug
:   off-the-wall-%e7%bb%ad%ef%bc%89

\*\*\*太强大了，屡翻屡封。这是《爱心无限手把手菜鸟篇》　－　如何正常接收Gmail和翻墙。这是[以前攻略](http://www.guizishanren.com/?p=560)的更新版。

**1.　正常接收Gmail**

自从2010年初开始，Gmail的连接就变得很不稳定，具体反映在每个用户上的情况还不一样，很难归纳总结。总而言之，you-know-who做了手脚，而且是相当高明的手脚。但还是有办法回到正常状态：

－　如果是苹果OS X系统

a.  在Finder里，Applications=\>Utilities
b.  打开Terminal程序
c.  sudo pico /etc/hosts
d.  在password提示栏，输入苹果机这个用户帐号的密码
e.  用键盘上的上下左右键将pointer移到hosts文件的最后一行
f.  将下列字符输入(IP地址后需要空一格）

[![image0](http://www.guizishanren.com/wp-content/uploads/2011/06/Screen-shot-2011-06-02-at-1.27.03-AM.png)](http://www.guizishanren.com/wp-content/uploads/2011/06/Screen-shot-2011-06-02-at-1.27.03-AM.png)

g.  按control + x键
h.  在"Save modified buffer..."的提示栏，输入"Y"
i.  在"File Name to Write: /etc/hosts"提示栏，直接按enter键

这就可以了。Gmail可以正常使用了。

－　如果是Windows系统

a.  在“我的电脑”，进入system32\\drivers\\etc
b.  用软件“Notepad/记事本”打开这个文件夹下面的hosts文件
c.  将上述苹果版里提到的四行字符粘贴到hosts文件的最底端
d.  保存文件（文件名仍然是hosts)

Voila!　Gmail回复正常！

**2. 穿越那个墙**

上篇提到的blockcn.com已经被DNS污染了，这家公司换了个新域名[www.5bird.com](http://www.5bird.com)，还是管用的。

​a.
注册新用户，购买套餐（有两种，SSH和VPN。我选SSH类型），具体细节参见上篇[Off
The Wall](http://www.guizishanren.com/?p=560)。

​b.
下述步骤是在火狐浏览器（目前最好，最快，最全面的浏览器）上实现的。你如果用的不是火狐，就[下载一个](http://www.mozilla.com/en-US/firefox/new/)。理论上，在其他的浏览器，譬如Chrome,
Safari上也能通过某种变通的路径实现，但我没试过，不好演示。

​c. 下载火狐的插件，[Auto
Proxy](https://addons.mozilla.org/zh-CN/firefox/addon/autoproxy/)。安装这个插件，并按照[本文的说明](http://fendou.org/2010/03/23/firefox-ssh-autoproxy/)来完成设置，很简单的。这个插件帮你判断哪些网站需要穿越（就是那些劳苦大众喜闻乐见的网站啦），哪些不需要。

如果是苹果OS X系统，

d.  下载免费软件[iSSH](http://www.apple.com/downloads/macosx/unix_open_source/issh.html)

如果是Windows系统，

d.  下载免费软件[myentunnel](http://nemesis2.qx.net/pages/MyEnTunnel)

​e.
下面完成在iSSH/myentunnel（它们的用途和功能基本是一样的）里的设置。有这么几个关键的变量：

Remote Address: ssh\*\*\*.5bird.com
（这是你在购买5bird套餐时选择的美国服务器编号）

Port: 22

User Name: (你自己知道）

Password: (你自己知道）

并且，选择Socks Proxy(-D), Local Port: 7070

​f. Save Settings
(按一下就可以了，界面不会显示什么变化的　－　这是两个制作比较简陋的软件）

​e. Connect.
Myentunnel连接成功会在屏幕右下角有图标显示（从红色变成绿色）；iSSH简陋到都没有任何提示。没有连接不上的错误信息就表明连接成功了。

Voila!　尽情遨游吧！
