import chalk from 'chalk';

export async function cloneRepository(repoUrl: string, targetDir: string) {
  try {
    console.log(chalk.blue(`Cloning repository from ${repoUrl}...`));
    const { execa } = await import('execa');
    await execa('git', ['clone', repoUrl, targetDir]);
    console.log(chalk.green('Repository cloned successfully'));
  } catch (error) {
    throw new Error(`Failed to clone repository: ${error}`);
  }
}

export async function initGitRepository(dir: string) {
  try {
    console.log(chalk.blue('Initializing new Git repository...'));
    const { execa } = await import('execa');
    await execa('git', ['init'], { cwd: dir });
    await execa('git', ['add', '.'], { cwd: dir });
    await execa('git', ['commit', '-m', 'Initial commit'], { cwd: dir });
    console.log(chalk.green('Git repository initialized'));
  } catch (error) {
    throw new Error(`Failed to initialize Git repository: ${error}`);
  }
}
