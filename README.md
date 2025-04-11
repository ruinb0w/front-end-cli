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
```sh
npm install -g .
```

## usage

```sh
$ cli-tool

Usage: cli-tool [options] [command]

A CLI tool for creating projects from templates

Options:
  -V, --version                       output the version number
  -h, --help                          display help for command

Commands:
  create <project-name>               Create a new project from template
  generate|g <view> <component-name>  Generate a new view component
  generate|g <com> <component-name>   Generate a reusable component
  cli-update                          Check for updates cli tool
  help [command]                      display help for command
```
