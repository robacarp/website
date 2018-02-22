---
title: Secret secrets
date: 2018-02-22 10:36:19
tags: docker secrets aws jq
layout: post
---

Secrets should never be stored anywhere except a dedicated, encrypted keystore.

Never store your secrets in a repo, environment file, on disk, and especially never on developer machines.

Secrets can be API keys, database connection strings, encryption keys, whatever.

Amazon [KMS](https://aws.amazon.com/kms/) works really well with other AWS services to allow certain boxes to fetch and decrypt certain secrets without any credentials on the box, enforced by IAM policies. However, if you're not careful you'll end up storing those credentials in your generated Docker containers, your development/ops workstations, and everywhere else.

So how do you run your app in an environment without storing the secrets _somewhere_? Simple, fetch them in a wrapper script which injects them into the environment and hands off the process to your server.

Example Dockerfile

    FROM alpine:latest

    ENV POSTGRESQL_URL localhost

    ENV SECRET 00000000000000000000
    ENV API_KEY 00000000000000000000
    ENV API_KEY 00000000000000000000

    ARG SERVER_ENV
    ENV SERVER_ENV ${SERVER_ENV:-development}

    COPY /src /app

    WORKDIR /app
    RUN compile_code

    COPY bin/run_server_in_environment /root/run_server_in_environment

    ENTRYPOINT ["/bin/bash", "/root/run_server_in_environment"]


run_server_in_environment.sh wrapper script

    #!/bin/bash

    set -euo pipefail

    if [[ ! ${SERVER_ENV:-} ]]; then
      echo No SERVER_ENV present, aborting.
      exit 1
    fi

    case "$SERVER_ENV" in
      testing)
        echo "Not fetching any credentials for testing"
        ;;
      staging)
        environment_path="/staging/env"
        ;;
      production)
        environment_path="/production/env"
        ;;
      *)
        echo "unknown SERVER_ENV: $SERVER_ENV"
        exit 1
    esac

    if [[ "$environment_path" ]]; then
      echo "Fetching environment variables from $environment_path..."

      environment=$(aws ssm get-parameters-by-path \
        --region='us-east-1' \
        --path="$environment_path" \
        --with-decryption \
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

      if [[ $? -ne 0 ]]; then
        echo "Unable to fetch environment variables."
      else
        var_count=$(echo "$environment" | wc -l)
        echo "Exporting $var_count environment variables."
        eval "$environment"
      fi
    fi

    # if a command was passed to this script, run it in the environment
    if [[ $# -gt 0 ]]; then
      eval "$@"

    # otherwise, start the server
    else
      exec server_start
    fi
