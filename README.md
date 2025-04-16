# front-end-cli

## Install

```sh
git clone https://github.com/ruinb0w/front-end-cli.git
cd front-end-cli

# pnpm i
# yarn add
npm install

# pnpm build
# yarn build
npm run build
```

## add to global

> pnpm build will gloabl install cli-tool automaticaly, if not try this

```sh
npm install -g .
```

## usage

```sh
$ fli #frontend-cli

Usage: fli [options] [command]

A CLI tool for creating projects from templates

Options:
  -V, --version          output the version number
  -h, --help             display help for command

Commands:
  create <project-name>  Create a new project from template
  generate|g             Generate files (use `g view <name>` or `g com <name>`), you can get more help by `fli help g`
  cli-update             Check for updates cli tool
  help [command]         display help for command
```
