import chalk from 'chalk';
import { getLatestVersion } from '../utils/version';

export async function checkUpdate() {
  try {
    const latestVersion = await getLatestVersion();
    if (latestVersion) {
      console.log(chalk.yellow(`New version available: ${latestVersion}`));
      console.log(chalk.blue('Run `npm update -g my-cli` to update'));
    } else {
      console.log(chalk.green('You are using the latest version'));
    }
  } catch (error) {
    console.error(chalk.red('Error checking for updates:'), error);
  }
}
