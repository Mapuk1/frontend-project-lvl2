import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import gendiff from '../src/index.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import json from '../src/formatters/json.js';

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

const diffFull = fs.readFileSync(getFixturePath('diffDepth.txt'), 'utf8').trimRight();
const diffPlain = fs.readFileSync(getFixturePath('diffPlain.txt'), 'utf8').trimRight();
const diffJson = fs.readFileSync(getFixturePath('diffJson.txt'), 'utf8').trimRight();

test.each`
file1           | file2           | expected
${'file1.json'} | ${'file2.json'} | ${result}
${'file1.yml'}  | ${'file2.yml'}  | ${result}
${'file1.ini'}  | ${'file2.ini'}  | ${result}
${'1.json'}     | ${'2.json'}     | ${diffFull}
`('gendiff $file1 $file2', ({ file1, file2, expected }) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  const diff = gendiff(filepath1, filepath2);
  const actualValue = stylish(diff);
  expect(actualValue).toEqual(expected);
});
test('diffPlain', () => {
  const filepath1 = getFixturePath('1.json');
  const filepath2 = getFixturePath('2.json');
  const diff = gendiff(filepath1, filepath2);
  const actualValue = plain(diff);
  expect(actualValue).toEqual(diffPlain);
});
test('diffJson', () => {
  const filepath1 = getFixturePath('1.json');
  const filepath2 = getFixturePath('2.json');
  const diff = gendiff(filepath1, filepath2);
  const actualValue = json(diff);
  expect(actualValue).toEqual(diffJson);
});
