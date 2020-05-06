---
title: Notes on combining terraform and ansible together
date: 2018-02-21 22:52:51
tags: ansible terraform terragrunt
layout: post
guid: 84b8d020-855f-423a-a41e-82ce95c5f49f
---

Ansible communicates rather well with EC2 for inventory using the recommended python script. But:
- By default it scans every aws region before emitting it's helpful datastore. Set your regions in the ini file.
- Tags work pretty well as filter attributes, except ansible prefixes all of them with `tag_`
- The cache can get old. Surprisingly, the command to clear it is `bin/ec2-inventory.py --refresh-cache`

Terraform diff update works _pretty well_ to orchestrate cloud environments, but it still seems green enough that I need to hold its hand for certain things.

Terragrunt tries but doesn't help the matter by adding 49 lines of boilerplate to each file, handicapping the Terraform DSL, and dividing your configuration up. I am suspicious that Terraform is deliberately handicapping the Terragrunt project with odd constraints on the DSL.

In order to get Ansible to successfully process a Terraformed EC2 instance, I'm switching ansible playbooks on EC2 tags:

{% highlight yaml %}
---
- name: Bootstrap
  hosts: tag_bootstrap_true
  become: true
  gather_facts: no
{% endhighlight %}

I'd like to write a "please bootstrap me, Ansible" tag with Terraform and clear it with Ansible but Terraform will just add it back in the next time it runs.

This userdata script removes the need for most of the bootstrapping for Ansible:

{% highlight bash %}
#!/bin/bash
sudo apt-get update
sudo apt-get -y install python-simplejson python-pip libpq-dev
pip install psycopg2
{% endhighlight %}

However the first run of ansible against the server must be performed with a specified username:

{% highlight console %}
$ ansible-playbook roles/base/tasks/*.yml --user=ubuntu
{% endhighlight %}

So the workflow is this:

- Terraform up a new EC2 instance, with userdata to install Ansible prerequisites
- Target ansible at that new instance `ansible-playbook roles/base/tasks/*.yml --user=ubuntu`
- Target ansible at that new instance `ansible-playbook roles/<role>/tasks/*.yml`
