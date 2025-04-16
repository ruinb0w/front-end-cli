import { Command } from 'commander';
import { createCommand } from './commands/create';
import { checkUpdate } from './commands/update';
import { generateViewCommand } from './commands/generate';
import { generateComCommand } from './commands/generate_com';
import { generateStoreCommand } from './commands/generate_store';
import { generateHookCommand } from './commands/generate_hook';

const program = new Command();

program
  .version('0.0.3')
  .description('A CLI tool for creating projects from templates');

program
  .command('create <project-name>')
  .description('Create a new project from template')
  .action(createCommand);

const generateCommand = new Command('generate')
  .alias('g')
  .description('Generate files (use `g view <name>` or `g com <name>`), you can get more help by `fli help g`');

generateCommand
  .command('view <component-name>')
  .description('Generate a new view component')
  .action(generateViewCommand);

generateCommand
  .command('com <component-name>')
  .description('Generate a reusable component')
  .action(generateComCommand);

generateCommand
  .command('store <store-name>')
  .description('Generate a store with pinia, its sharing state')
  .action(generateStoreCommand);

generateCommand
  .command('hook <hook-name>')
  .description('Generate a hook, its state is isolate')
  .action(generateHookCommand);

program.addCommand(generateCommand);

program
  .command('cli-update')
  .description('Check for updates cli tool')
  .action(checkUpdate);
program.parse(process.argv);
