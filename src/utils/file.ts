import path from 'path';
import fs from 'fs';

// Utility function to find the project root (where package.json resides)
export function findProjectRoot(currentDir: string): string {
  const root = path.parse(currentDir).root;
  let dir = currentDir;
  while (dir !== root) {
    const packageJsonPath = path.join(dir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  throw new Error('Could not find project root (directory containing package.json)');
}
