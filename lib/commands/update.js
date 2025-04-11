"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUpdate = checkUpdate;
const chalk_1 = __importDefault(require("chalk"));
const version_1 = require("../utils/version");
async function checkUpdate() {
    try {
        const latestVersion = await (0, version_1.getLatestVersion)();
        if (latestVersion) {
            console.log(chalk_1.default.yellow(`New version available: ${latestVersion}`));
            console.log(chalk_1.default.blue('Run `npm update -g my-cli` to update'));
        }
        else {
            console.log(chalk_1.default.green('You are using the latest version'));
        }
    }
    catch (error) {
        console.error(chalk_1.default.red('Error checking for updates:'), error);
    }
}
