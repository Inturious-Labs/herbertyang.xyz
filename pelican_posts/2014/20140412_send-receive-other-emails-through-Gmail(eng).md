Title: Use Gmail to receive and send other emails
Date: 2014-04-12 08:00
Tags: 
Category: Tech
Slug: receive-and-send-other-emails-through-Gmail(eng)
Summary: Checking multiple mailboxes is a pain, but you can use Gmail to manage all of them through one single interface and one single login session. I have more than 10+ mailboxes from various institutions, companies and projects. I forward all of them to my personal gmail and also set up "Send Email As ... " in my gmail account so that I can receive and send other emails without ever leaving my gmail account. This article explains how to do that. 

Checking multiple mailboxes is a pain, but you can use Gmail to manage all of them through one single interface and one single login session. I have more than 10+ mailboxes from various institutions, companies and projects. I forward all of them to my personal gmail and also set up "Send Email As ... " in my gmail account so that I can receive and send other emails without ever leaving my gmail account and I never need to bother to login to other mailboxes. 

Frankly, the act of login to multiple email accounts on a daily basis just doesn't make any sense to me. It's a pure waste of time and obviously extremely inefficient.

This article explains how to avoid that and consolidate all your emails in your Gmail account.

There are two ways to achieve this objective. One is to receive other email through POP3 protocol in Gmail; the other one is to forward other email to Gmail and then set up ""Send Mail as ... " in Gmail. *Do not use POP3*. POP3's speed of email retrieval is much slower. It takes certain time interval for Gmail to connect to the POP3 server of the other email. Sometimes that can be as long as one hour. I have seen people writing Python scripts to try to fool Gmail server to speed up the retrieval speed as it cannot be adjusted by user. This kind of delay is unacceptable in many situations (it took me quite a while to figure this out after many frustrating moments). Then why does POP3 even exist? It has one very handy function - it can retrieve ALL the historical emails from the POP3 server from day one. Sometimes, this could be useful depending on what you need to do. 

Here's a walk-through of how to set up forward + send mail as in Gmail:

1. Set up forwarding (to be competed by yourself or system Admin of the host server)
	
	System admin (a role I have played often in my various projects) sets up "forwarder" in the control panel of the host email server (such as hostmonster.com), so that emails sent to *AAA@XXX.com* will be forwarded to *AAA@gmail.com* right away (with no delay). This is slightly different from the usual "forward" concept in emailing. For example, when your friend sends you an email to your AAA@XXX.com from his BBB@163.com, this email will appear directly (as a result of the above setup) in your AAA@gmail.com, showing sender as "BBB@163.com" and receiver as AAA@XXX.com. 
	
	Sometimes it doesn't take a system admin to do those. For example, you are the owner of AAA@XXX.com (which could be your @gsb.stanford.edu email for example). Then you just need to go into its settings to automatically forward all the emails to your AAA@gmail.com. Usually, to do this the system will ask the owner of AAA@gmail.com (ie. you) to approve this forwarding request to prevent spamming. Just follow the system's instructions to complete the forwarding setup.

2. Set up sending (to be completed by yourself)

	Besides receiving, you also want to be able to send email as AAA@XXX.com in your AAA@gmail.com login session/interface. You need to complete this step by yourself in Gmail.
	
	- Gmail=>Settings=>Accounts=>Send Mail As

	- Click “Add another email address you own”
		
		- Name, input a name you prefer to label this

		- Email Address, input "AAA@XXX.com"

		- mail to:Address, input "AAA@XXX.com"

		- Tick the box for "Treat as an alias"，then click Next Step
		
	- In the next window that pops up, click "Send Confirmation Email" button. Gmail will send an email to AAA@XXX.com for confirmation. If you have already completed the first step Forwarding, then you will receive this email right away in your Gmail account. It will contain a 6~8 digit confirmation code.
	
	- Copy and paste the confirmation code into the window, click "Confirm (Verify)"
	
	Now when you are sending emails in Gmail, in the "Send" field you will now see a list of all the email addresses you can choose from, including AAA@XXX.com. This list does not appear before, when the only "Send Mail As" option is your AAA@gmail.com. It does now.
	
	When BBB@163.com receives your reply, he will see this email comes from AAA@XXX.com, even though you receive his original email and reply to him entirely within your AAA@gmail.com account. He doesn't even know the existence of your AAA@gmail.com. 

That's it! Let me a comment if you run into any issues. 

(The original Chinese version was written earlier in [this post](http://guizishanren.com/posts/2014/02/receive-and-send-other-emails-through-Gmail/))
