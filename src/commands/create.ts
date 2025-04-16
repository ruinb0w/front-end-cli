import chalk from 'chalk';
import inquirer from 'inquirer';
import { getLatestVersion } from '../utils/version';

export async function createCommand(projectName: string, options: any) {
  const { execa } = await import('execa');

  try {
    // 1. 检查更新
    const latestVersion = await getLatestVersion();
    if (latestVersion) {
      console.log(chalk.yellow(`New version available: ${latestVersion}`));
    }

    // 2. 获取模板URL
    let templateUrl = options.template;
    if (!templateUrl) {
      const templates = [
        { name: 'vue3', value: 'https://github.com/ruinb0w/vue3-template.git' },
        { name: 'nextjs', value: 'https://github.com/ruinb0w/nextjs-template.git' },
      ];

      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'template',
          message: 'Select a template:',
          choices: templates,
        }
      ]);
      templateUrl = answers.template;
    }

    // 3. 克隆仓库
    console.log(chalk.blue(`Cloning template from ${templateUrl}...`));
    await execa('git', ['clone', templateUrl, projectName]);

    // 4. 删除已有的.git目录（如果存在）
    const fs = await import('fs');
    const path = await import('path');
    const gitDir = path.join(projectName, '.git');
    if (fs.existsSync(gitDir)) {
      console.log(chalk.blue('Removing existing .git directory...'));
      fs.rmSync(gitDir, { recursive: true, force: true });
    }

    // 5. 初始化新仓库
    console.log(chalk.blue('Initializing new repository...'));
    await execa('git', ['init'], { cwd: projectName });

    console.log(chalk.green(`Project ${projectName} created successfully!`));
    console.log();
    console.log(chalk.blue('Usage:'));
    console.log(chalk.blue(`  cd ${projectName}`));
    console.log(chalk.blue(`  yarn`));
  } catch (error) {
    console.error(chalk.red('Error creating project:'), error);
    process.exit(1);
  }
}
