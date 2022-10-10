从iTunes 4.8升级到iTunes 5.0
============================

date
:   2011-10-15 13:20

author
:   admin

category
:   Apple\_苹果

tags
:   iOS 5, iTunes, Lion, Mac, 升级

slug
:   %e4%bb%8eitunes-4-8%e5%8d%87%e7%ba%a7%e5%88%b0itunes-5-0

<p>
<object width="257" height="33" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">
<embed width="257" height="33" type="application/x-shockwave-flash" src="http://www.xiami.com/widget/0_3409199/singlePlayer.swf" wmode="transparent">
</embed>
</object>
</p>
每次升级iTunes都步步惊心，这次也不例外。昨晚把iTunes升级到5.0后，打开iTunes，赫然看到里面一片空白，说iTunes
Library找不到了。网上搜了一下，用这个方法可以解决第一步（我用的是iMac）：

－ 找到iTunes文件夹

－ 在根目录下，把iTunes Library.xml文件drag到“桌面”上

－ 把根目录下，把iTunes Library文件drag到“Trash Bin”里

－ 打开iTunes，在“File”下，选择"Library", 然后"Import Playlist"

－ 在桌面上找到iTunes Library.xml文件，双击，开始import

然后的三个多小时里就发生了一起波澜壮阔的不可逆的导入过程，很显然，苹果在create一个新的library，我的所有音乐文件都被重新拷到这个新建立的library里，这可是60G的文件啊！真是个超级坑爹！后来我明白是怎么回事了，苹果改变了iTunes
Library的结构，它选择了最保险但也是最笨的方式导入原来的媒体文件－把那些文件从原来的地址原样拷贝到新的library。好在我的iMac有1TB的硬盘，经得起苹果这么折腾。我相信肯定有其他更好的办法可以直接导入音乐文件，重新指向一下就行了，而未必需要重新拷贝。但不管怎么样，我就这么硬熬过来了。

新的library建立了后，音乐文件倒是没受影响，以前的play
count，星级评价，等各种attribute都还在。这个时候我又发现了一个新问题，我的所有电影，iBooks里的电子书，下载/购买的apps全部都没有了。

此时已是凌晨四五点钟光景，为了可以迈向更加宏伟的蓝图－本次升级的终极目标iOS
5，我咬咬牙开始重新下载所有的Apps。还好，在iTunes的iTunes
Store里，点击Apple
ID，在帐号里有一个选项可以看到以前购买/下载过的所有Apps。我稍微精选了一下，又开始新的一轮波涛汹涌的下载。平均即时网速为400-500KB/s,
还马马虎虎。

今早醒来，神完气足，我仔细地研究了一下iTunes
Library的结构，发现其实不需要重新下载那些Apps的。视频文件和iBooks文件也可以很容易地通过copy+paste的方式在硬盘上直接解决。是酱紫滴：

在iTunes 4.8里，各类文件的位置如下：

音乐：        iTunes\\Music Library\\......  （按照音乐人的文件夹）

电子书：    iTunes\\Music Library\\Books\\...... （按照作者的文件夹）

视频：        iTunes\\Music Library\\Movies\\......

Ringtones: iTunes\\Music Library\\Ringtones\\......

Podcast:     iTunes\\Music Library\\Podcasts\\......
(我辛辛苦苦下载的TED啊）

移动应用：iTunes\\Mobile Applications\\

在这个比较原始的架构里，这几个关键的文件夹跟我几百个音乐人的文件夹是放在一起的，很容易看漏掉，这是最坑爹的地方。

在iTunes 5.0里，上述所有类别型的文件夹全部在一个地方：

iTunes\\iTunes Media\\

下面需要做的就很简单了，把4.8 Library里的相关文件拷贝到5.0
Library的对应位置，然后Sync。Voila!
