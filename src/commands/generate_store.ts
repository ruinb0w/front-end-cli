import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { findProjectRoot } from "../utils/file";
import { generateStoreTemplate } from '../templates/store';

export async function generateStoreCommand(storeName: string) {
  // Validate the input format (must be camelCase and end with "Store", e.g., userStore)
  const camelCaseRegex = /^[a-z][a-zA-Z0-9]*Store$/;
  if (!camelCaseRegex.test(storeName)) {
    console.error(chalk.red(`Error: Store name "${storeName}" must be in camelCase and end with "Store" (e.g., userStore)`));
    process.exit(1);
  }

  const projectRoot = findProjectRoot(process.cwd());
  const storesDir = path.join(projectRoot, 'src', 'store');
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
      const storeContent = generateStoreTemplate(storeName);

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
