---
title: Notes on setting up a raspberry-pi from a bare image
date: 2019-06-09 20:58:51
tags: bash raspberry-pi diskutil wpa_supplicant ssh
layout: post
guid: 3381d216-2d2f-43e5-b684-8c8348dc88da
---

## Acquire an image

[https://www.raspberrypi.org/downloads/raspbian/](https://www.raspberrypi.org/downloads/raspbian/)

## Burn the .img

On macOS.

Find the dev node for the disk:

{% highlight bash %}
# find disk
diskutil list

# unmount disk (eg disk3)
diskutil unmountDisk /dev/rdisk3

# copy image on disk3
sudo dd bs=1m if=~/Downloads/raspbian-stretch-lite-2019-04-08-hkcam-v0.0.8-armv6.img of=/dev/rdisk3 conv=sync
{% endhighlight %}

## Pre-first-boot modifications:

A bunch of stuff can be enabled or disabled by dropping magic files into the boot partition which save a _bunch_ of time.

#### WiFi Config

On the SD card, before booting it for the first time:

Create a file on the boot partition called `wpa_supplicant.conf` with these contents:

{% highlight text %}
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
        ssid="network"
        psk="password"
        id_str="new"
}
{% endhighlight %}

#### Enable SSH

On the SD card, before booting it for the first time:

Touch a file called `ssh` in the boot folder, this will configure the system to allow ssh.

[https://www.raspberrypi.org/documentation/remote-access/ssh/README.md](https://www.raspberrypi.org/documentation/remote-access/ssh/README.md)

## Enable the camera

sudo raspi-config nonint do_camera 0

[https://raspberrypi.stackexchange.com/questions/10357/enable-camera-without-raspi-config/93187#93187](https://raspberrypi.stackexchange.com/questions/10357/enable-camera-without-raspi-config/93187#93187)

[https://www.raspberrypi.org/documentation/configuration/camera.md](https://www.raspberrypi.org/documentation/configuration/camera.md)

## Disable the camera LED

First up, we need to edit the config file.

sudo nano /boot/config.txt


Add the following line to the end of the file, then save it.

disable_camera_led=1

[https://thepihut.com/blogs/raspberry-pi-tutorials/16043032-stealth-cam-how-to-disable-the-raspberry-pi-camera-led](https://thepihut.com/blogs/raspberry-pi-tutorials/16043032-stealth-cam-how-to-disable-the-raspberry-pi-camera-led)


