---
title: Notes on installing HKCam on a raspberry-pi with systemd
date: 2019-06-09 20:44:29
tags: bash systemd raspberry-pi
layout: post
guid: 9d507254-6025-4eb3-955b-5c500167c09b
---

# Installing HKCam on a raspberry pi with systemd

The documentation for manually installing HKCam on a Raspberry PI are frustratingly obscured in an Ansible playbook. This is what I did to get it up and running manually.

## My System Info:

{% highlight console %}
$ cat /etc/debian_version
9.8
$ cat /etc/issue
Raspbian GNU/Linux 9 \n \l
{% endhighlight %}

## Install Process:

{% highlight console %}
# Installing `raspberrypi-kernel-headers` prevents the
#   "kernel headers for this kernel does not seem to be installed."
# message from appearing when installing v4l2loopback with apt-get:
#
#   Module build for kernel 4.14.98-v7+ was skipped since the
#   kernel headers for this kernel does not seem to be installed.
#
# Also sometimes this error is shown when attempting to attach with `modprobe v4l2loopback`
# modprobe: FATAL: Module v4l2loopback not found in directory /lib/modules/4.14.98-v7+

$ sudo apt install raspberrypi-kernel-headers
$ sudo apt install v4l2loopback
$ sudo apt install ffmpeg

$ echo 'options v4l2loopback video_nr=1' | sudo tee -a /etc/modprobe.d/v4l2loopback.conf
$ sudo modprobe v4l2loopback
$ echo v4l2loopback | sudo tee -a /etc/modules

$ sudo modprobe bcm2835-v4l2
$ echo bcm2835-v4l2 | sudo tee -a /etc/modules

# visit https://github.com/brutella/hkcam/releases and download a tar.gz
$ wget https://github.com/brutella/hkcam/releases/download/v0.0.8/hkcam-v0.0.8_linux_armhf.tar.gz
$ tar xzf hkcam-v0.0.8_linux_armhf.tar.gz
$ cd hkcam-v0.0.8_linux_armhf/
$ sudo cp usr/bin/hkcam /usr/local/bin

$ sudo adduser --system --ingroup video hkcam
{% endhighlight %}

## Systemd Service Configuration:

{% highlight ini %}
# /etc/systemd/system/hkcam.service

[Unit]
Description=HKcam HomeKit Camera
After=syslog.target network-online.target

[Service]
Type=simple
User=hkcam
WorkingDirectory=/home/hkcam
ExecStart=/usr/local/bin/hkcam
Restart=always
RestartSec=10
KillMode=process

[Install]
WantedBy=multi-user.target
{% endhighlight %}

## Run script

{% highlight bash %}
#!/bin/bash
# /etc/hkcam

# set the video4linux ctl parameters
v4l2-ctl --set-fmt-video=width=1280,height=720,pixelformat=YU12
v4l2-ctl -c video_bitrate=1000000

# exec over to hkcam
exec /usr/local/bin/hkcam --min_video_bitrate=500
{% endhighlight %}

## Activate the service:

{% highlight console %}
$ sudo systemctl daemon-reload
$ sudo systemctl start hkcam
$ sudo systemctl enable hkcam
{% endhighlight %}

