import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { findProjectRoot } from "../utils/file";

export async function generateViewCommand(type: string, componentName: string) {
  // Validate the input format (must be PascalCase, e.g., AbcDef)
  const pascalCaseRegex = /^[A-Z][a-z0-9]+([A-Z][a-z0-9]+)*$/;
  if (!pascalCaseRegex.test(componentName)) {
    console.error(chalk.red(`Error: Component name ${type} "${componentName}" must be in PascalCase (e.g., AbcDef)`));
    process.exit(1);
  }

  const projectRoot = findProjectRoot(process.cwd());
  const viewsDir = path.join(projectRoot, 'src', 'views');
  const componentDir = path.join(viewsDir, componentName);
  const componentFilePath = path.join(componentDir, `${componentName}.vue`);

  try {
    // Check if the views directory exists, create if not
    if (!fs.existsSync(viewsDir)) {
      fs.mkdirSync(viewsDir, { recursive: true });
    }

    // Check if the component directory exists, create if not
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }

    // Check if the component file exists, create if not
    if (!fs.existsSync(componentFilePath)) {
      // Convert PascalCase to kebab-case (e.g., AbcDef -> abc-def)
      const kebabCaseName = componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      const componentContent = `<script setup lang="ts">

</script>

<template>
  <div class="${kebabCaseName}">
    ${kebabCaseName}
  </div>
</template>

<style lang="scss" scoped></style>`;

      fs.writeFileSync(componentFilePath, componentContent);
      console.log(chalk.green(`Component ${componentName} created successfully at ${componentFilePath}`));
    } else {
      console.log(chalk.yellow(`Component ${componentName} already exists at ${componentFilePath}`));
    }
  } catch (error) {
    console.error(chalk.red('Error generating component:'), error);
    process.exit(1);
  }
}

