---
title: keeping your secrets hidden
date: 2019-06-12 11:43:11
tags: bash aws secret password
layout: post
guid: bfa8fe73-a834-4dd7-a761-7f4cf487fb9f
---

There aren't many rules when deploying applications to the cloud, but here's one I think is pretty important:

> Don't commit your API keys to your git repository.

Perhaps even more important:

> Don't commit your database credentials to your git repository.

But your app needs to connect to Services and it surely needs to connect to the database. Many applications follow this pattern, demonstrated by a Rails `config/database.yml` file:

{% highlight yaml %}
development:
  adapter: postgresql
  database: app_development

test:
  adapter: postgresql
  database: app_test

production:
  adapter: postgresql
  url: <%= ENV['DATABASE_URL'] %>
{% endhighlight %}

That's right, in production, this app reads the database connection string from an environment variable. Great! Now the application doesn't need any secret credentials in the source code. But where does this environment config come from?

### Deferring Responsibility

Frequently, it comes from an `/etc/environment` file maintained by an Ansible guru or maybe even handcrafted by a local server shepherd.

But how far down the line does that push the responsibility of secrecy? Who is taking care of the sacred credentials? All the way to the docker container, or perhaps to the VM.

If you're deploying to a PaaS, maybe you're done there. As a service, they provide the database and they inject the credentials for you, perhaps even configured to serve up API keys for others services your app is connecting to.

But if you're managing your own VMs in AWS, or even using Elastic Container Service to orchestrate a docker cloud, you're likely to end up with your database credentials hard coded into your `/etc/environment` or worse, baked into a docker image for your production application.

If your production container is downloaded, does it connect to the production database at boot? Yikes!

If your VM is cast into an AMI and then used to stamp out new instances, does each new instance come with the credentials to access your database? Yikes!

The solution is a little more delicate, but allows credentials and api keys to never be stored in an /etc/environment file, a docker container, or with the source code.

### Enter State Manager

Amazon EC2 has a small utility allll the way at the bottom of that never-ending left hand pane of resources called "State Manager" under "Systems Manager Services" which stores secrets using at-rest encryption. Secrets can be requested via the AWS API, and access granted using an EC2 or ECS IAM Role.

Create a KMS key:

{% highlight console %}
$ aws kms create-key --description="production secrets"
{% endhighlight %}

Upload a few secrets to your SSM "keychain":

{% highlight console %}
$ aws ssm put-parameter --type SecureString --key-id $key_id --name '/production/database_string' --value 'postgresql://user:pass@host:port/db'
$ aws ssm put-parameter --type SecureString --key-id $key_id --name '/production/sendgrid_api_secret' --value 'SG.000000000000000000000000000'
{% endhighlight %}

Now secrets can be read by API:

{% highlight console %}
$ aws ssm get-parameters-by-path --region=us-east-1 --path=/production/ --with-decryption

{
  "Parameters": [
    {
      "Version": 1, 
      "Type": "SecureString", 
      "Name": "/production/database_string", 
      "Value": "postgresql://user:pass@host:port/db"
    }, 
    {
      "Version": 1, 
      "Type": "SecureString", 
      "Name": "/production/sendgrid_api_secret", 
      "Value": "SG.000000000000000000000000000"
    }
  ]
}
{% endhighlight %}

### Application Secret Discovery

It's necessary to configure your EC2 instance or ECS task definition to launch with an IAM role which grants access to your KMS key for decryption, and to the parameter store to read parameters with the correct path prefix.

After that, assuming your server normally launches with the command `/bin/my_app`, a script like this can be used to wrap the server binary and inject the application secrets into the environment.

{% highlight bash %}
#!/bin/bash

set -euo pipefail

# Fetching environment variables from AWS
vars=$(
  aws ssm get-parameters-by-path \
    --region='us-east-1' \
    --path="/production/" \
    --with-decryption
)

# Format variables into Bash exports
exports=$(
  echo "$vars" \
  | jq --exit-status --raw-output \
    '
      .Parameters[] |
      {
        name: .Name | capture("/(.*/)(?<parsed_name>.*)") | .parsed_name,
        value: .Value
      } |
      "export \(.name)=\"\(.value)\""
    '
)

# eval the exports, including the environment variables into the environment
eval "$exports"

# hand off this process and the modified environment to the application server
exec /bin/my_app
{% endhighlight %}

### More Benefits

Storing credentials in a central repository not only helps prevent leaks, but it also aids in changing credentials.

Instead of needing to touch each server and update credentials manually, update everything with an Ansible run, or rebuild containers to update secrets, it's as simple as updating a secret in one place and restarting services. Each service will fetch its own credentials again at boot and connect with the new secrets.

----

This post was originally written for [DailyDrip.com](https://www.dailydrip.com/) and published on 2018-08-01. [Link to the original](https://www.smoothterminal.com/articles/keeping-your-secrets-hidden).
