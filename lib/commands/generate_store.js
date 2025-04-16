"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStoreCommand = generateStoreCommand;
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const file_1 = require("../utils/file");
const store_1 = require("../templates/store");
async function generateStoreCommand(storeName) {
    // Validate the input format (must be camelCase and end with "Store", e.g., userStore)
    const camelCaseRegex = /^[a-z][a-zA-Z0-9]*Store$/;
    if (!camelCaseRegex.test(storeName)) {
        console.error(chalk_1.default.red(`Error: Store name "${storeName}" must be in camelCase and end with "Store" (e.g., userStore)`));
        process.exit(1);
    }
    const projectRoot = (0, file_1.findProjectRoot)(process.cwd());
    const storesDir = path_1.default.join(projectRoot, 'src', 'store');
    const storeDir = path_1.default.join(storesDir, storeName);
    const storeFilePath = path_1.default.join(storeDir, `${storeName}.ts`);
    try {
        // Check if the store directory exists, create if not
        if (!fs_1.default.existsSync(storesDir)) {
            fs_1.default.mkdirSync(storesDir, { recursive: true });
        }
        // Check if the specific store directory exists, create if not
        if (!fs_1.default.existsSync(storeDir)) {
            fs_1.default.mkdirSync(storeDir, { recursive: true });
        }
        // Check if the store file exists, create if not
        if (!fs_1.default.existsSync(storeFilePath)) {
            const storeContent = (0, store_1.generateStoreTemplate)(storeName);
            fs_1.default.writeFileSync(storeFilePath, storeContent);
            console.log(chalk_1.default.green(`Store ${storeName} created successfully at ${storeFilePath}`));
        }
        else {
            console.log(chalk_1.default.yellow(`Store ${storeName} already exists at ${storeFilePath}`));
        }
    }
    catch (error) {
        console.error(chalk_1.default.red('Error generating store:'), error);
        process.exit(1);
    }
}
