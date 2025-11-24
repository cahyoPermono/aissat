#!/usr/bin/env node
import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';

const clientDir = process.argv[2] || join(process.cwd(), 'build', 'client');
const indexPath = join(clientDir, 'index.html');
const notFoundPath = join(clientDir, '404.html');

if (!existsSync(indexPath)) {
  console.error('index.html not found in', clientDir);
  process.exit(1);
}

try {
  copyFileSync(indexPath, notFoundPath);
  console.log('Copied', indexPath, 'to', notFoundPath);
} catch (err) {
  console.error('Failed to copy index.html to 404.html', err);
  process.exit(1);
}
