"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProjectRoot = findProjectRoot;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Utility function to find the project root (where package.json resides)
function findProjectRoot(currentDir) {
    const root = path_1.default.parse(currentDir).root;
    let dir = currentDir;
    while (dir !== root) {
        const packageJsonPath = path_1.default.join(dir, 'package.json');
        if (fs_1.default.existsSync(packageJsonPath)) {
            return dir;
        }
        dir = path_1.default.dirname(dir);
    }
    throw new Error('Could not find project root (directory containing package.json)');
}
