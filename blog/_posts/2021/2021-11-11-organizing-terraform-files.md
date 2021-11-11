---
title: Organizing files in a terraform codebase
date: 2021-11-11 20:28:01
tags: terraform organizing aws
layout: post
guid: 02a09b9e-fc4b-4193-b60d-adb9a6dbccae
---

### Organizing files in a terraform codebase

I started using terraform in about v0.8.3. At the time I thought "they'll figure out how to organize my terraform codebase soon," but they never have. This year v1.0 landed and you still cannot have folders in a terraform project, which is just bonkers to me.

```
devops_repo/terraform> find . -iname '*.tf' | wc -l
     349
```

The terraform projects I manage often have _hundreds_ of `.tf` files across dozens of "project domains" and at least a few AWS accounts. To reduce chaos and provide a safe infrastructure development environment, smaller discrete units of resources are broken apart from each other. Here is one file listing from a single environment, of a single application, for a single region:

```
.terraform/
.plan.out
.terraform-version
.terraform.lock.hcl
_data.tf
_main.tf
_vars.tf
acm_certificate.tf
asg.tf
asg_scheduled_actions.tf
cloudfront.tf
ec2_bastion.tf
elastic_domain.tf
iam_async_image_uploads.tf
iam_instance_profile.tf
iam_jenkins_permissions.tf
iam_policies.tf
iam_policies_parameters.tf
kms_key.tf
lb.tf
lb_downtime_rules.tf
lb_redirect_rules.tf
lb_static_rules.tf
log_group.tf
networking.tf
route53_dns.tf
s3_async_image_uploads.tf
s3_elb_logs.tf
s3_env_resources.tf
s3_public_assets.tf
s3_public_data.tf
s3_user_data.tf
waf_acl.tf
webapp.tf
```

### Tenants of organization

Assuming a project otherwise has:

1. Separate "states" for separate environments (Production, Staging, etc)
1. Modules which represent groups of terraform resources which are versioned together (Webapp, VPC, etc)

An individual terraform project domain can easily become difficult to manage. Questions arise about where resources live on the disk, "Where is the configuration for the s3 bucket that holds user data? user_data.tf? s3_policies.tf?"

Here is my strategy:

1. Terraform "meta" should be underscore prefixed: `_main.tf`, `_data.tf`
1. File names should be prefixed with the technology at play: `s3`,`ec2`, etc.
1. File names should represent the meaningful user-facing features the resources enable: `uploads`, etc.


#### Terraform "meta" files

Terraform "meta" files should be underscore prefixed. Upon upgrading from terraform &lt; 0.13 with `terraform 0.13upgrade`, a "versions.tf" file will be created for you. This practice leaves important terraform meta-configuration files scattered throughout an alphabetical file listing. Prefixing all meta-configuration files with an underscore hoists them to the top of an alphabetical file listing.

I tend to further break down the meta into: `_main.tf`, `_data.tf`, and `_locals.tf`. Each of these tends to grow large enough that it's easy to lose resources or configuration in the mess if they're not separated out.

- *_main.tf* - holds a single `terraform {}` block, and all `provider "" {}` declarations.
- *_data.tf* - holds all external resources needed for this project domain to apply. `data "aws_vpc" "vpc" {}` etc.
- *_locals.tf* - holds all the "configuration variables" a project domain. Usually just a single `locals {}` block with a dozen or so variables.

#### Technology prefixed filenames, and meaningful user-facing features

Simply naming a file `s3.tf` will get you part of the way there in a small project. When you have two s3 buckets in an infrastructure, you'll get lost quickly.

When a request comes in to modify the infrastructure, it's usually stated in terms of the user-facing features it enables, e.g. "Task: allow users to upload files directly to S3." As a result, a naming convention like `s3_user_uploads.tf` should allow you to quickly locate the resources which need to be modified for an infrastructure update.
