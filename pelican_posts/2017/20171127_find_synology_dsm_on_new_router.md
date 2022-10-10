Title: How to Find IP for Synology DSM on New Router
Date: 2017-11-27 08:00
Tags: NAS
Category: Tech
Slug: find-IP-for-synology-dsm-on-new-router
Summary: We move a lot and so does our Synology NAS DS215j. When we move to a new home, there will be a new router, and Synology DSM needs to be mapped on this new network. It's not always a straightforward transition process though, depending on the difference between the old and the new router. Sometimes it works like a charm without any additional work, and sometimes it feels like moving mountains to do something as basic as finding the IP for the Synology device. 

We move a lot and so does our Synology NAS DS215j. When we move to a new home, there will be a new router, and Synology DSM needs to be mapped on this new network. It's not always a straightforward transition process though, depending on the difference between the old and the new router. Sometimes it works like a charm without any additional work, and sometimes it feels like moving mountains to do something as basic as finding the IP for the Synology device. 

The tricky part is the default IP address for the router. On my previous TP-Link router, the default IP address for LAN is `192.168.0.1`, and the DS215j had a static IP address `192.168.0.500`. 

On the Antbang router for our new home, the default IP address for LAN is `192.168.250.1`. Ideally, I want the DS215j to use `192.168.250.500` on the new network. Here's the step-by-step guide of how to achieve that. It's rather counter-intuitive and barely available in any online forum. 

## 0: Forget About Find.Synology.Com

Synology's user guide says `find.synology.com` can find the Synology device on the same network. It's true, but only works for the initial setup of a brand new Synology. After the initial configuration, this method will NOT work any more, for good security reason.

## 1: Change the IP of New Router to Match the Old Router

Login to the new router from web address `192.168.250.1`.

Change the LAN IP for the new router Antbang to be `192.168.0.1` from its default `192.168.250.1`. This is to enable the Synology device to be detectable on this new network.

## 2: Change the IP for Synology to Match the New Router

Open a web browser and go to `192.168.0.500`, the old IP that is stored on Synology's memory. Upon successful connection, go to 

```
Control Panel/Network/Network Interface/LAN/Edit
```

Change the IP address from `192.168.0.500` to the correct one on the new network `192.168.250.500` and change the gateway IP from `192.168.0.1` to `192.168.250.1`

The status bar will hang, the the connection will be lost in a few seconds. This is normal. Don't worry. The new settings have been saved on the Synology device.

## 3: Change the IP for New Router to Its Default

Login to the new router from its current web address `192.168.0.1`.

Change the LAN IP for the new router to be its default one, `192.168.250.1`, rebooting the router.

This step is the reverse of Step 1.

## 4: Test Everything

The new router should be available now at `192.168.250.1`, and the Synology device should be available at `192.168.250.500`. 

The world is at peace now.

