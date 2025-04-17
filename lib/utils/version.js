"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestVersion = getLatestVersion;
exports.checkNodeVersion = checkNodeVersion;
exports.updateAndBuild = updateAndBuild;
const semver_1 = __importDefault(require("semver"));
const fs_1 = require("fs");
const path_1 = require("path");
const chalk_1 = __importDefault(require("chalk"));
async function getLatestVersion() {
    try {
        const packagePath = (0, path_1.join)(__dirname, '../../package.json');
        const { version } = JSON.parse((0, fs_1.readFileSync)(packagePath, 'utf8'));
        const { default: latestVersion } = await import('latest-version');
        const latest = await latestVersion('cli');
        return semver_1.default.gt(latest, version) ? latest : null;
    }
    catch (error) {
        console.error(chalk_1.default.yellow('Warning: Failed to check for updates'), error);
        return null;
    }
}
function checkNodeVersion(requiredVersion) {
    const currentVersion = process.version;
    return semver_1.default.gte(currentVersion, requiredVersion);
}
async function updateAndBuild() {
    try {
        const { execSync } = require('child_process');
        const gitStatus = execSync('git status --porcelain').toString().trim();
        const gitFetch = execSync('git fetch').toString().trim();
        if (gitStatus || gitFetch.includes('up to date')) {
            console.log(chalk_1.default.blue('Pulling latest changes...'));
            execSync('git pull', { stdio: 'inherit' });
        }
        console.log(chalk_1.default.blue('Building project...'));
        execSync('yarn build', { stdio: 'inherit' });
        console.log(chalk_1.default.blue('Installing package globally...'));
        execSync('npm install -g .', { stdio: 'inherit' });
        console.log(chalk_1.default.green('Update and build completed successfully!'));
    }
    catch (error) {
        console.error(chalk_1.default.red('Error during update and build:'), error);
        throw error;
    }
}
