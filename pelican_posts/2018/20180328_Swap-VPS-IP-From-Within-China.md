Title: Swap VPS IP from Within China
Date: 2018-03-28 08:00
Tags:
Category: Tech
Slug: swap-vps-ip-from-within-china
Summary: Running a website from within the physical border of China can use either international VPS service provider like Digital Ocean/Linode or domestic ones. Using domestic VPS service provider requires registration of ICP, which is only possible through a legal entity in China. International VPS doesn't have such requirement. Any individual can point a domain name through his domain registrar provider, registered by individuals or legal entities, to an IP address from the VPS service provider. 

Running a website from within the physical border of China can use either international VPS service provider like Digital Ocean/Linode or domestic ones. Using domestic VPS service provider requires registration of ICP, which is only possible through a legal entity in China. International VPS doesn't have such requirement. Any individual can point a domain name through his domain registrar provider, registered by individuals or legal entities, to an IP address from the VPS service provider. 

For well-known reason, many foreign IPs are blocked in China. For the same datacenter from a VPS provider, it's possible that one IP is accessible from China and the other one is not, while everything else being the same. When opening a new virtual machine, there is no guarantee that its IP would work. It's beyond the control of the VPS and they have given up trying to do IP swapping proactively to get around this problem, since it's become such a pervasive issue in the last 10 years.  

Therefore, I just have to do IP swapping myself. Here's the loop that needs to be repeated until an IP is found to be accessible. 

## Step 0 Install MTR

```
nix-env -qa | grep mtr
nix-env -i mtr
```

## Step 1 Open A New VM

In Linode (or similar VPS), **Add a Linode**

Pick the cheapest instance, `Linode 1024`, with `20GB Storage`, `1 CPU Core`, `1TB XFER`, and `$5/month`.

Pick a location with the fastest connection speed. `Tokyo 2, JP` and `Fremont, CA` are usually the fastest two data centers from Linode. 

**Add This Linode!**

The IP for this new VM becomes available now, but it's not ping-able, as the VM is not yet running. 

## Step 2 Deploy New VM

On the dashboard of this newly created VM, click **Deploy an Image**. Pick `Ubuntu 16.04 LTS` or `Ubuntu 17.10` distro, `20224`MB for deployment disk size, `256MB` for Swap Disk. Set a root password.

**Deploy**, and **Boot**. 

Now the VM is up and running. We can run **MTR** test to see if this IP can be accessed successfully

## Step 3 Verify IP's Accessibility

Simple ping works fine, but ping doesn't give sufficient information as to the root cause of the block. MTR would reveal the route from machine to machine and identify where the packet gets dropped. 

Ping first

```
ping 50.116.6.45

PING 50.116.6.45 (50.116.6.45): 56 data bytes
Request timeout for icmp_seq 0
Request timeout for icmp_seq 1
Request timeout for icmp_seq 2
^C
--- 50.116.6.45 ping statistics ---
4 packets transmitted, 0 packets received, 100.0% packet loss
```

Doesn't look good. The IP cannot be pinged. Run MTR as root

```
sudo mtr --report 50.116.6.45
```

It takes about 30-60 seconds to run the test. The output report looks like this:

```
Start: Thu Mar 29 10:13:35 2018
HOST: guizishan                   Loss%   Snt   Last   Avg  Best  Wrst StDev
  1.|-- 192.168.0.1                0.0%    10    1.5   1.7   0.8   3.3   0.6
  2.|-- 192.168.1.1                0.0%    10    1.3   2.5   1.2   5.5   1.2
  3.|-- 1.20.173.61.broad.xw.sh.d  0.0%    10   40.3  19.5   3.0  65.5  21.5
  4.|-- 124.74.1.37                0.0%    10    5.8   6.2   3.7   8.8   1.5
  5.|-- 101.95.42.1                0.0%    10    3.0   4.7   3.0   6.9   1.2
  6.|-- 61.152.24.6                0.0%    10    8.8   8.5   3.7  11.5   1.9
  7.|-- 202.97.24.174              0.0%    10    5.1   7.1   3.0  23.2   5.9
  8.|-- ???                       100.0    10    0.0   0.0   0.0   0.0   0.0
```

Data is lost at `202.97.24.174`. What is this?

```
whois 202.97.24.174
```

Hello, my friend. Here you are!

```
inetnum:        202.97.0.0 - 202.97.31.255
netname:        CHINANET-BB
descr:          CHINANET backbone network
descr:          Data Communication Division
descr:          China Telecom
country:        CN
admin-c:        CH93-AP
tech-c:         CH93-AP
mnt-by:         APNIC-HM
status:         ALLOCATED PORTABLE
last-modified:  2015-08-26T00:32:53Z
source:         APNIC
mnt-irt:        IRT-CHINANET-CN

irt:            IRT-CHINANET-CN
address:        No.31 ,jingrong street,beijing
address:        100032
e-mail:         anti-spam@ns.chinanet.cn.net
abuse-mailbox:  anti-spam@ns.chinanet.cn.net
admin-c:        CH93-AP
tech-c:         CH93-AP
auth:           # Filtered
mnt-by:         MAINT-CHINANET
last-modified:  2010-11-15T00:31:55Z
source:         APNIC

person:         Chinanet Hostmaster
nic-hdl:        CH93-AP
e-mail:         anti-spam@ns.chinanet.cn.net
address:        No.31 ,jingrong street,beijing
address:        100032
phone:          +86-10-58501724
fax-no:         +86-10-58501724
country:        CN
mnt-by:         MAINT-CHINANET
last-modified:  2014-02-27T03:37:38Z
source:         APNIC
```

It's time to retreat and concede defeat. You know you're running against the wall, literally and figuratively. 

**Repeat Step 1 ~ 3**, until Ping and MTR return a positive result like this:

```
ping 172.104.120.198

PING 172.104.120.198 (172.104.120.198): 56 data bytes
64 bytes from 172.104.120.198: icmp_seq=0 ttl=50 time=88.836 ms
64 bytes from 172.104.120.198: icmp_seq=1 ttl=50 time=90.575 ms
64 bytes from 172.104.120.198: icmp_seq=2 ttl=50 time=90.797 ms
^C
--- 172.104.120.198 ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 88.836/90.069/90.797/0.877 ms
```

Looking good. The IP seems to work. Verify the path is smooth

```
sudo mtr --report 172.104.120.198
```

This output report suggests everything along the route is a **Go**. 

```
HOST: guizishan                   Loss%   Snt   Last   Avg  Best  Wrst StDev
  1.|-- 192.168.0.1                0.0%    10    1.5   2.0   1.5   3.5   0.3
  2.|-- 192.168.1.1                0.0%    10    2.0   2.1   1.7   2.7   0.0
  3.|-- 1.20.173.61.broad.xw.sh.d  0.0%    10  175.9  26.9   3.1 175.9  54.7
  4.|-- 124.74.1.53                0.0%    10   95.2  14.8   4.3  95.2  28.3
  5.|-- 101.95.42.9               20.0%    10   25.3  11.2   3.5  38.2  13.2
  6.|-- 61.152.24.6                0.0%    10    6.0   9.3   6.0  11.7   1.7
  7.|-- 202.97.24.170              0.0%    10    6.6   6.5   4.1   8.6   1.4
  8.|-- 202.97.33.190              0.0%    10    6.4   7.3   5.4   9.0   1.1
  9.|-- 202.97.51.62               0.0%    10   86.2  88.3  86.2  97.4   3.2
 10.|-- ae-1.r31.tokyjp05.jp.bb.g 20.0%    10   84.8  99.9  84.8 117.1  15.6
 11.|-- ae-3.r02.tokyjp05.jp.bb.g 10.0%    10   86.4  86.6  84.3  93.7   2.8
 12.|-- ae-0.a00.tokyjp05.jp.bb.g  0.0%    10   90.0  87.8  85.1  93.9   2.7
 13.|-- 192.80.16.6               10.0%    10  111.8 111.4 108.0 120.6   4.1
 14.|-- 139.162.64.31             10.0%    10   85.5  86.0  85.2  88.3   1.0
 15.|-- li1730-198.members.linode  0.0%    10   88.1  88.3  86.5  90.3   1.3
```

The all-mighty `202.97.xx.xx` is on the route - of course it is. It doesn't block the path this time. A viable connection between the user machine and the newly created VM from Linode has been successfully established.There is some data loss along the way, but nothing alarming. 

A working IP today is no guarantee that it shall continue to work tomorrow. We're completely at the mercy of `202.97.xx.xx`. Run this loop until a viable IP is found. 