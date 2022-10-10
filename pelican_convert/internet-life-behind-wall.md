Internet Life Behind the Wall
=============================

date
:   2014-02-02 19:24

author
:   admin

category
:   Internet\_互联网

slug
:   internet-life-behind-wall

If you don't understand why I need to write this post, that means you
haven't been to China. If you're planning to go to China and want to
continue to be able to use variously services such as Facebook, Youtube,
Gmail and Popyard.org (IMHO the best China-related news website), read
on.

**1) iPhone/iPad**

I use Gmail to manage all my email accounts and use iPhone/iPad's
Mail.app (in the form of IMAP) to receive and send Gmail messages. For
some interesting reason, Gmail works just fine on iOS device as if it's
never blocked by GFW. I also use the ultra-sleek Mailbox.app on
iPhone/iPad to manage Gmail and it works perfectly. For receiving
notices and firing off brief replies, just use iPhone/iPad.

How about other apps on iPhone/iPad? Facebook, No; Twitter, No;
Instagram, Yes; Foursquare, Yes; Wikipedia, Yes; YouTube, No; Netflix,
No. I can probably figure out how to access them with SSH if I really
want to, but I think it's not worth the effort. It's a good time to
embrace a real physical life when you're in China.

**2) Mail.app on MacBook Air**

I live my Internet life on Macbook Air, easily the best laptop that has
ever graced my laps. Mail.app has  very idiosyncratic set-up regarding
its proxy settings and it seems that the system-wide proxy change will
not affect Mail.app at all. In short, Mail.app works perfectly to
receive and send Gmail messages (with or without attachment). No need to
do anything funky such as VPN, Tor or SSH. Mail.app may not work if you
use one of those methods to get around GFW.

Of course, it's a profoundly philosophical question as to whether to use
Gmail's web interface or use Gmail via a desktop software such as
Mail.app. Over the years I've switched between these two methods many
times. Recently I've switched back to Mail.app because I would then be
able to encrypt my messages with PGP (Pretty-Good-Privacy) protocol
using Mail.app. Other factors include concern for personal data safety
and Gmail's still rudimentary "Write Email" function. The most important
factor is that I want to manage all my contacts (in thousands) on
iCloud, not on Gmail's Contact (obviously the worst and most
disappointing product out of Google in the past ten years).

Mail.app doesn't work to 100% satisfaction for Gmail's IMAP just
out-of-box. You need to do certain tweaks in Gmail and Mail.app's
Settings to get what you need, but for most parts, it's works fine.

**3) Surfing the web outside the Wall**

Broadly speaking, there are three methods, changing host file, VPN and
SSH. I used to [mess around with the host
file](http://guizishanren.com/off-the-wall-%E7%BB%AD%EF%BC%89/), but I
find it too troublesome, not dummy-proof and not always working. Most
casual users go with VPN, because this is the only method that is
comprehensible to average users. Do not waste time on free VPN. By
definition, if it's free, it'll have a few hundred million users in a
few days (the fact that even you know about this...), that means it'll
be blocked soon enough. You can buy paid VPN services (it's a huge
industry in China on its own) from taobao.com. The milage of those
services varies.

SSH is much more stable and faster, but its configuration could be a
challenge for casual users. You can pay for commercial SSH service just
as you do with VPN, or you can use your own SSH. I'm a paying member for
hostmonster.com's web hosting service (where this guizishanren.com is
hosted) and hostmonster.com provides SSH access, which means I can set
up SSH myself without having to pay for any other third parties. Here's
a guide:

​a) Enable SSH in the Control Panel of hostmonster.com (or whatever
hosting service you use). It's usually under "Security".

b)  On Mac, open Applications, open Terminal, type:

ssh -D ZZZ -C -N <YYY@XXX>

ZZZ is a port number you specify. Just pick anything, like 6060.

YYY is your account name at your hosting service account.

XXX is the domain name of your hosting service account.

You'll be prompted for entering a password. Enter the password for your
hosting service account.

That's it. You have just established a SSH access via port ZZZ between
your Mac and the remote host @XXX. You will be channeling all your
Internet traffic through this SSH connection.

c)  Change Proxy Settings

In your browser (say, Chrome), go to Preferences/Extensions, disable all
the extensions that will manage your proxy, such as the popular "Proxy
Switchy!" and "Unblock Youku".

Then go to Preferences/Settings/Show Advance Settings/Network/Change
Proxy Settings. This will open up a new window (which can also be
accessed from Mac/System Preferences/Network/Wi-Fi/Advanced/Proxies).
Check "SOCKS Proxy". On the right-side panel, enter "127.0.0.1" in SOCKs
Proxy Server field, and "ZZZ" after the semi-colon. Click Ok and Apply
to let the change take effect.

Now you're surfing the web using an IP address outside the wall. Voila!

A few things to note for SSH:

- After you change the Proxy setting in the Mac system/browser, Mail.app
will stop working and prompt you for some SMTP changes. Just ignore
that. Unfortunately [Mail.app will not work with SSH tunnel and SOCKS
proxy for very obscure
reason](http://larve.net/people/hugo/2005/blog/2006/10/13/mailapp-ssh-tunnels-and-socks-proxies/).
My recommendation is that, when you need to surf outside the wall, just
do surfing with SSH and Proxy changed to 127.0.0.1; when you need to do
emailing in Mail.app, just undo the change in proxy (by unchecking
"SOCKS Proxy") and stop SSH (by enter Ctrl-C in Terminal).

- With SSH and SOCKs Proxy on, you can use Gmail's web interface, but
it's slow and not stable. Last time I checked, I could not do attachment
in the mail.

- All your cloud services such as dropbox, box.net, skydrive, google
drive, and evernote, should work fine with SSH/SOCKs Proxy.

Good luck!
