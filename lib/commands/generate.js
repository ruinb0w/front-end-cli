"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateViewCommand = generateViewCommand;
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const file_1 = require("../utils/file");
async function generateViewCommand(type, componentName) {
    // Validate the input format (must be PascalCase, e.g., AbcDef)
    const pascalCaseRegex = /^[A-Z][a-z0-9]+([A-Z][a-z0-9]+)*$/;
    if (!pascalCaseRegex.test(componentName)) {
        console.error(chalk_1.default.red(`Error: Component name ${type} "${componentName}" must be in PascalCase (e.g., AbcDef)`));
        process.exit(1);
    }
    const projectRoot = (0, file_1.findProjectRoot)(process.cwd());
    const viewsDir = path_1.default.join(projectRoot, 'src', 'views');
    const componentDir = path_1.default.join(viewsDir, componentName);
    const componentFilePath = path_1.default.join(componentDir, `${componentName}.vue`);
    try {
        // Check if the views directory exists, create if not
        if (!fs_1.default.existsSync(viewsDir)) {
            fs_1.default.mkdirSync(viewsDir, { recursive: true });
        }
        // Check if the component directory exists, create if not
        if (!fs_1.default.existsSync(componentDir)) {
            fs_1.default.mkdirSync(componentDir, { recursive: true });
        }
        // Check if the component file exists, create if not
        if (!fs_1.default.existsSync(componentFilePath)) {
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
            fs_1.default.writeFileSync(componentFilePath, componentContent);
            console.log(chalk_1.default.green(`Component ${componentName} created successfully at ${componentFilePath}`));
        }
        else {
            console.log(chalk_1.default.yellow(`Component ${componentName} already exists at ${componentFilePath}`));
        }
    }
    catch (error) {
        console.error(chalk_1.default.red('Error generating component:'), error);
        process.exit(1);
    }
}
