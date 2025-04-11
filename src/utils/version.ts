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
