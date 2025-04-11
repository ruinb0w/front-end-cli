"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommand = createCommand;
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const version_1 = require("../utils/version");
async function createCommand(projectName, options) {
    const { execa } = await import('execa');
    try {
        // 1. 检查更新
        const latestVersion = await (0, version_1.getLatestVersion)();
        if (latestVersion) {
            console.log(chalk_1.default.yellow(`New version available: ${latestVersion}`));
        }
        // 2. 获取模板URL
        let templateUrl = options.template;
        if (!templateUrl) {
            const templates = [
                { name: 'Default Template', value: 'https://github.com/username/default-template.git' },
                { name: 'React Starter', value: 'https://github.com/username/react-starter.git' },
                { name: 'Node.js API', value: 'https://github.com/username/node-api.git' },
            ];
            const answers = await inquirer_1.default.prompt([
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
        console.log(chalk_1.default.blue(`Cloning template from ${templateUrl}...`));
        await execa('git', ['clone', templateUrl, projectName]);
        // 4. 初始化新仓库
        console.log(chalk_1.default.blue('Initializing new repository...'));
        await execa('git', ['init'], { cwd: projectName });
        console.log(chalk_1.default.green(`Project ${projectName} created successfully!`));
    }
    catch (error) {
        console.error(chalk_1.default.red('Error creating project:'), error);
        process.exit(1);
    }
}
