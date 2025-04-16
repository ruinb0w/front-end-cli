import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { findProjectRoot } from "../utils/file";
import { generateHookTemplate } from '../templates/hook';

export async function generateHookCommand(storeName: string) {
  const projectRoot = findProjectRoot(process.cwd());
  const storesDir = path.join(projectRoot, 'src', 'hooks');
  const storeDir = path.join(storesDir, storeName);
  const storeFilePath = path.join(storeDir, `${storeName}.ts`);

  try {
    // Check if the store directory exists, create if not
    if (!fs.existsSync(storesDir)) {
      fs.mkdirSync(storesDir, { recursive: true });
    }

    // Check if the specific store directory exists, create if not
    if (!fs.existsSync(storeDir)) {
      fs.mkdirSync(storeDir, { recursive: true });
    }

    // Check if the store file exists, create if not
    if (!fs.existsSync(storeFilePath)) {
      const storeContent = generateHookTemplate(storeName);

      fs.writeFileSync(storeFilePath, storeContent);
      console.log(chalk.green(`Store ${storeName} created successfully at ${storeFilePath}`));
    } else {
      console.log(chalk.yellow(`Store ${storeName} already exists at ${storeFilePath}`));
    }
  } catch (error) {
    console.error(chalk.red('Error generating store:'), error);
    process.exit(1);
  }
}
