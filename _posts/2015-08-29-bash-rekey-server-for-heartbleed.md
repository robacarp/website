---
title: Bash script to rekey a server
date: 2015-08-29 07:58:00 -0600
tags: bash ssh security
imported-from: gist
gist-url: https://gist.github.com/robacarp/10193438
layout: post
---

The so called [Heartbleed](http://heartbleed.com/) bug in OpenSSL caused it to leak private key material resulting in fully compromised encryption. After patching a server, the servers ssh keys need to be regenerated. This bash script will move current public and private keys to an archive directory, generate new keys, and document the process for auditing.

    #!/bin/bash

    set -e

    hostname
    archive_dir="/etc/ssh/compromised_keys/$(date +%F)"
    mkdir -p $archive_dir

    mv /etc/ssh/ssh*_key $archive_dir
    mv /etc/ssh/ssh*_key.pub $archive_dir

    ssh-keygen -f /etc/ssh/ssh_host_rsa_key -N '' -t rsa >> $archive_dir/regen_log
    ssh-keygen -f /etc/ssh/ssh_host_dsa_key -N '' -t dsa >> $archive_dir/regen_log
    ssh-keygen -f /etc/ssh/ssh_host_ecdsa_key -N '' -t ecdsa >> $archive_dir/regen_log

    ssh-keygen -lf /etc/ssh/ssh_host_rsa_key
    ssh-keygen -lf /etc/ssh/ssh_host_dsa_key
    ssh-keygen -lf /etc/ssh/ssh_host_ecdsa_key
