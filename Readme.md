# Notes

## Services

- [Website](https://robacarp.io/new_dice.json), Jekyll/Static HTML, nginx.
- [Dice generator](https://robacarp.io/new_dice.json), Crystal, deploys on port 3000.

## Development and Writing

To write blog posts:
- `cd blog` then `overmind s` to start the jekyll server. Then visit at [http://localhost:4000](http://localhost:4000).

To boot full container and services:
- `script/build` then `script/run`

## Deployment

- `script/build deployment`
- `script/deploy`
