import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import gendiff from '../src/index.js';
import stylish from '../src/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const diffFull = fs.readFileSync(getFixturePath('diffDepth.js'), 'utf8');

test.each`
file1           | file2           | expected
${'file1.json'} | ${'file2.json'} | ${result}
${'file1.yml'}  | ${'file2.yml'}  | ${result}
${'file1.ini'}  | ${'file2.ini'}  | ${result}
${'1.json'}     | ${'2.json'}     | ${diffFull}
`('gendiff $file1 $file2', ({ file1, file2, expected }) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  expect(stylish(gendiff(filepath1, filepath2), 0).split(',').join('')).toEqual(expected);
});
