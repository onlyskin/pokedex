# Pokedex
A Pokedex-style frontend written in `TypeScript` using `mithril.js`.

## Requirements:
A node package manager, such as `yarn` – `brew install yarn`.
Some way to serve your local build, such as – [serveit](https://github.com/garybernhardt/serveit) – `brew install serveit`.

## Installation:
Run `yarn` to install dependencies.
Build the project with `./build.sh`.

## To build to `out/`:
`./build.sh`
(This will compile `.ts` files, bundle them into `index.bundle.js`, and sync
any files in `html/` or `css/`.)

## Local development:
Serve and watch locally using `serveit -s out "./build.sh"`. This will serve
the `out/` dir on `localhost:8000` and rerun the build script whenever the site
is requested and files have changed.

## To generate a sprite sheet, put `.png` images in `img/` and run:
`./make_sprites.sh SIZE` (`SIZE` is the size to scale each image to)
