"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const create_1 = require("./commands/create");
const update_1 = require("./commands/update");
const generate_1 = require("./commands/generate");
const generate_com_1 = require("./commands/generate_com");
const generate_store_1 = require("./commands/generate_store");
const generate_hook_1 = require("./commands/generate_hook");
const program = new commander_1.Command();
program
    .version('0.0.3')
    .description('A CLI tool for creating projects from templates');
program
    .command('create <project-name>')
    .description('Create a new project from template')
    .action(create_1.createCommand);
const generateCommand = new commander_1.Command('generate')
    .alias('g')
    .description('Generate files (use `g view <name>` or `g com <name>`), you can get more help by `fli help g`');
generateCommand
    .command('view <component-name>')
    .description('Generate a new view component')
    .action(generate_1.generateViewCommand);
generateCommand
    .command('com <component-name>')
    .description('Generate a reusable component')
    .action(generate_com_1.generateComCommand);
generateCommand
    .command('store <store-name>')
    .description('Generate a store with pinia, its sharing state')
    .action(generate_store_1.generateStoreCommand);
generateCommand
    .command('hook <hook-name>')
    .description('Generate a hook, its state is isolate')
    .action(generate_hook_1.generateHookCommand);
program.addCommand(generateCommand);
program
    .command('cli-update')
    .description('Check for updates cli tool')
    .action(update_1.checkUpdate);
program.parse(process.argv);
