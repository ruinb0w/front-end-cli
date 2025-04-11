"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneRepository = cloneRepository;
exports.initGitRepository = initGitRepository;
const chalk_1 = __importDefault(require("chalk"));
async function cloneRepository(repoUrl, targetDir) {
    try {
        console.log(chalk_1.default.blue(`Cloning repository from ${repoUrl}...`));
        const { execa } = await import('execa');
        await execa('git', ['clone', repoUrl, targetDir]);
        console.log(chalk_1.default.green('Repository cloned successfully'));
    }
    catch (error) {
        throw new Error(`Failed to clone repository: ${error}`);
    }
}
async function initGitRepository(dir) {
    try {
        console.log(chalk_1.default.blue('Initializing new Git repository...'));
        const { execa } = await import('execa');
        await execa('git', ['init'], { cwd: dir });
        await execa('git', ['add', '.'], { cwd: dir });
        await execa('git', ['commit', '-m', 'Initial commit'], { cwd: dir });
        console.log(chalk_1.default.green('Git repository initialized'));
    }
    catch (error) {
        throw new Error(`Failed to initialize Git repository: ${error}`);
    }
}
