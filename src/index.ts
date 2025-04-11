import { Command } from 'commander';
import { createCommand } from './commands/create';
import { checkUpdate } from './commands/update';

const program = new Command();

program
  .version('1.0.0')
  .description('A CLI tool for creating projects from templates');

program
  .command('create <project-name>')
  .description('Create a new project from template')
  .action(createCommand);

program
  .command('cli-update')
  .description('Check for updates cli tool')
  .action(checkUpdate);

program.parse(process.argv);
