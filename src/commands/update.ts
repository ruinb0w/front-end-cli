import chalk from 'chalk';
import { getLatestVersion, updateAndBuild } from '../utils/version';

export async function checkUpdate() {
  try {
    const latestVersion = await getLatestVersion();
    if (latestVersion) {
      console.log(chalk.yellow(`New version available: ${latestVersion}`));
      console.log(chalk.blue('Starting update and build process...'));
      await updateAndBuild();
    } else {
      console.log(chalk.green('You are using the latest version'));
    }
  } catch (error) {
    console.error(chalk.red('Error during update process:'), error);
  }
}
