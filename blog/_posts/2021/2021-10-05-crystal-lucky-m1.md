---
title: Installing Crystal+Lucky on M1 Mac
date: 2021-10-05 20:28:01
tags: crystal lucky mac m1
layout: post
guid: ff020a07-8738-4c98-9b09-6ed726b5afe0
---

### Mac+M1+Crystal+Lucky

This is the series of steps I followed to get Crystal and Lucky running on a Mac M1 from scratch, as of Oct. 2021.

### Prerequisites

- Ensure `~/bin` and `/opt` both exist.
- `/opt` will have to be created with `sudo` but should be owned by your user.
- Make sure your `$PATH` includes `~/bin`. Doing so [is up to you](https://askubuntu.com/questions/402353/how-to-add-home-username-bin-to-path) and will vary a bit depending on your shell.

### Installing crystal

From [this issue comment](https://github.com/crystal-lang/distribution-scripts/pull/104#issuecomment-920887960) the "second gen" build comes as a tar.gz. [This is a direct link to the archive](https://63866-6887813-gh.circle-artifacts.com/0/dist_packages/crystal-ci-univ2nd-dev-1-darwin-universal.tar.gz).

- In `/opt`, extract crystal-ci-univ2nd-dev-1.tar.gz.
- In `~/bin`, `touch crystal ; chmod u+x crystal` and then edit `~/bin/crystal` to have these contents:

```bash
#!/bin/bash

export CRYSTAL_PATH='lib:/opt/crystal-ci-univ2nd-dev-1/src'

export CRYSTAL_LIBRARY_PATH="$(brew --prefix)/lib"
export LDFLAGS="/opt/homebrew/opt/openssl@1.1/lib"
export CPPFLAGS="/opt/homebrew/opt/openssl@1.1/include"
export PKG_CONFIG_PATH="/opt/homebrew/opt/openssl@1.1/lib/pkgconfig"
export PATH="/opt/homebrew/opt/openssl@1.1/bin:$PATH"

exec '/opt/crystal-ci-univ2nd-dev-1/bin/crystal' "${@}"
```

- `which crystal` should now show `/Users/user/bin/crystal`
- `crystal -v` should now show:

```text
Crystal 1.2.0-dev [d7f25e0c6] (2021-09-15)

LLVM: 10.0.0
Default target: aarch64-apple-darwin
```

### Setting up shards

- [Clone the shards repo](git@github.com:crystal-lang/shards.git) to `/opt/shards`
- From `/opt/shards` run `make`
- From `~/bin` run `ln -s /opt/shards/bin/shards`
- `which shards` should now point to /opt/shards/bin/shards`
- `shards --version` should be `Shards 0.15.0 [6471b2b] (2021-10-04)`

### Setting up lucky cli

- [Clone the lucky_cli repo](git@github.com:luckyframework/lucky_cli.git) to `/opt/lucky_cli`
- From `/opt/lucky_cli` run `shards build`
- From `~/bin` run `ln -s /opt/lucky_cli/bin/lucky`
