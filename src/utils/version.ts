import semver from 'semver';
import { readFileSync } from 'fs';
import { join } from 'path';
import chalk from 'chalk';

export async function getLatestVersion(): Promise<string | null> {
  try {
    const packagePath = join(__dirname, '../../package.json');
    const { version } = JSON.parse(readFileSync(packagePath, 'utf8'));
    const { default: latestVersion } = await import('latest-version');
    const latest = await latestVersion('cli');
    return semver.gt(latest, version) ? latest : null;
  } catch (error) {
    console.error(chalk.yellow('Warning: Failed to check for updates'), error);
    return null;
  }
}

export function checkNodeVersion(requiredVersion: string): boolean {
  const currentVersion = process.version;
  return semver.gte(currentVersion, requiredVersion);
}

export async function updateAndBuild(): Promise<void> {
  try {
    const { execSync } = require('child_process');
    const gitStatus = execSync('git status --porcelain').toString().trim();
    const gitFetch = execSync('git fetch').toString().trim();

    if (gitStatus || gitFetch.includes('up to date')) {
      console.log(chalk.blue('Pulling latest changes...'));
      execSync('git pull', { stdio: 'inherit' });
    }

    console.log(chalk.blue('Building project...'));
    execSync('yarn build', { stdio: 'inherit' });

    console.log(chalk.blue('Installing package globally...'));
    execSync('npm install -g .', { stdio: 'inherit' });

    console.log(chalk.green('Update and build completed successfully!'));
  } catch (error) {
    console.error(chalk.red('Error during update and build:'), error);
    throw error;
  }
}
