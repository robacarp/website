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

# eval the exports
eval "$exports"

# start the server
exec printenv
