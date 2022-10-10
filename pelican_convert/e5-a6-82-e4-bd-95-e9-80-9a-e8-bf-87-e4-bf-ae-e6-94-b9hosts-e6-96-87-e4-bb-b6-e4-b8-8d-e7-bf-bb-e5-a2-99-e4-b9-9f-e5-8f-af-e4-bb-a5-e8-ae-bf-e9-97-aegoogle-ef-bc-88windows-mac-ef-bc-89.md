如何通过修改Hosts文件不翻墙也可以访问Google+（Windows & Mac）
=============================================================

date
:   2011-07-12 22:51

author
:   admin

category
:   Internet\_互联网

tags
:   Google, Google Plus, Hosts

slug
:   %e5%a6%82%e4%bd%95%e9%80%9a%e8%bf%87%e4%bf%ae%e6%94%b9hosts%e6%96%87%e4%bb%b6%e4%b8%8d%e7%bf%bb%e5%a2%99%e4%b9%9f%e5%8f%af%e4%bb%a5%e8%ae%bf%e9%97%aegoogle%ef%bc%88windows-mac%ef%bc%89

Google+被墙了。不过还好，不需要翻墙，只需要把电脑里的hosts文件修改一下就可以了。

**在Windows上的操作，傻瓜版：**

1.  在左下角“开始”菜单的搜索框里，键入“CMD”
2.  ping google.cn
3.  从屏幕上的结果中，抄下“来自 ”后的那个ip地址，譬如203.208.46.176。
4.  进入这个文件夹 C:\\Windows\\System32\\drivers\\etc\\hosts
5.  用Notepad/记事本打开hosts文件
6.  将下列内容粘贴到hosts文件的最后一行：

203.208.46.148 lh1.googleusercontent.com

203.208.46.148 lh2.googleusercontent.com

203.208.46.148 lh3.googleusercontent.com

203.208.46.148 lh4.googleusercontent.com

203.208.46.148 lh5.googleusercontent.com

203.208.46.148 lh6.googleusercontent.com

203.208.46.148 lh7.googleusercontent.com

203.208.46.148 s1.googleusercontent.com

203.208.46.148 s2.googleusercontent.com

203.208.46.148 images1-focus-opensocial.googleusercontent.com

203.208.46.148 images2-focus-opensocial.googleusercontent.com

203.208.46.148 images3-focus-opensocial.googleusercontent.com

203.208.46.148 webcache.googleusercontent.com

203.208.46.148 picasaweb.google.com

203.208.46.148 plus.google.com

203.208.46.148 mail-attachment.googleusercontent.com

​7. 用记事本的编辑菜单里的“替换”功能，将203.208.46.148全部替换成步骤\#
3里朝下的ip，203.208.46.176

​8. 保存hosts文件（原来的文件名），关掉hosts文件。刷新DNS, 在CMD窗户里
**ipconfig /flushdns**

​9.
现在就可以自由访问Google+了。以后如果ip地址发生改变，再ping一下google.cn并更换hosts文件里的地址就可以了。

**在Mac OS下的操作，傻瓜版：**

\# 1 -3 , 跟Windows版相同，ping google.cn, 抄下ip地址

4.  打开Finder，在前往里面选择前往文件夹，在弹出框里输入 etc
5.  在etc目录下,找到hosts文件，用TextEdit（文本编辑）打开

\# 6 - 9，同Windows版。然后刷新DNS，在CMD窗户里\**lookupd
-flushcache *\*

Voila!

注意：在Mac上，需要用root账号登录，才能获得对hosts文件的修改权限。其实，在cmd窗口下用sudo
pico的方式来编辑hosts文件是最直接省事的方法。不过給不懂这一套的人解释这个比较麻烦。。。。

我的Google+地址如下：<https://plus.google.com/115331596416003114882/posts>
