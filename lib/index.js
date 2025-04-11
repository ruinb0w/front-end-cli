"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const create_1 = require("./commands/create");
const update_1 = require("./commands/update");
const program = new commander_1.Command();
program
    .version('1.0.0')
    .description('A CLI tool for creating projects from templates');
program
    .command('create <project-name>')
    .description('Create a new project from template')
    .action(create_1.createCommand);
program
    .command('cli-update')
    .description('Check for updates cli tool')
    .action(update_1.checkUpdate);
program.parse(process.argv);
