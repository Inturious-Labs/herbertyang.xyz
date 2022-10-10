Title: 通过Gmail收发其他邮箱的邮件
Date: 2014-02-03 03:26
Tags: 中文
Category: Tech
Slug: receive-and-send-other-emails-through-Gmail(chn)
Summary: 用Gmail来收发其他邮件有两个办法，一个是通过POP3，一个是通过Forward + Send Mail As。POP3速度比较慢，因为Gmail从POP3服务器上获取邮件有一定的时间间隔，有时长达一个小时，这种延迟在很多情况下是无法让人接受的。本文介绍的是一个用户如何通过Forward + Send Mail As（全面优越于POP3）来收发其他邮箱的邮件。

用Gmail来收发其他邮件有两个办法，一个是通过POP3，一个是通过Forward + Send Mail As。POP3速度比较慢，因为Gmail从POP3服务器上获取邮件有一定的时间间隔，有时长达一个小时，这种延迟在很多情况下是无法让人接受的。本文介绍的是一个用户如何通过Forward + Send Mail As（全面优越于POP3）来收发其他邮箱的邮件，有两个步骤：

1. 由网管完成

	网管在邮件服务器上设置forwarder，把发给*AAA@XXX.com*的邮件“转发”到*AAA@gmail.com*。这个“转发”跟通常邮件里的转发略有不同。譬如，你的邮件是AAA@XXX.com，你的朋友从BBB@163.com给你发了封邮件，这封邮件（因为网管的设置）直接出现（其实是“被拷贝”）在你的AAA@gmail.com邮箱里，发件人显示仍然是BBB@163.com，收件人仍然是AAA@XXX.com。

	也就是说，只要网管完成了上述设置，你什么都不需要做就可以在Gmail里看到寄给AAA@XXX.com的邮件了。当然，这位网管之所以能做到这一点，是因为他的管理权限就是@XXX.com的电子邮件系统。

2. 由用户完成

	除了读，还需要能通过AAA@XXX.com发邮件。这个步骤需要用户自己完成。
	
	-   Gmail=>Settings=>Accounts=>Send Mail As

	- 点击“Add another email address you own”。
		
		- Name可以随便填自己喜欢的名字

		- Email Address里填写AAA@XXX.com

		- mailto:Address里填写AAA@XXX.com

		- 在"Treat as an alias"前打勾，点击Next Step
		
	- 在下一个窗口，点击“发送确认邮件”。Gmail会发封邮件给AAA@XXX.com，如果步骤1已经完成，你会在Gmail里收到这封邮件，内含6-8位的一个确认代码

	-   把邮件里的确认代码剪贴到下一个窗口，点击“确认”。

	在Gmail里发邮件时，在“发件人”一栏会看到一个菜单，里面有所有你可以“代发”的邮箱地址。选择合适的邮箱地址发送邮件即可。这样，当BBB@163.com收到你的回信时，他看到的是来自AAA@XXX.com的邮件，尽管你所有的操作都是在Gmail里完成的。

好了，现在你可以完全隐藏在*AAA@gmail.com*之后，完成*AAA@XXX.com*的所有操作了（收发邮件）。
