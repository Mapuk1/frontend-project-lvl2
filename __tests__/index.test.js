import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import gendiff from '../src/index.js';
import formatter from '../src/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);

const getAnswer = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf8').trimRight();

const filepath1 = getFixturePath('1.json');
const filepath2 = getFixturePath('2.json');

test.each`
  diff        | format           | namePath
  ${gendiff}  | ${'stylish'}     | ${'diffStylish'}
  ${gendiff}  | ${'json'}        | ${'diffJson'}
  ${gendiff}  | ${'plain'}       | ${'diffPlain'}
`('$namePath', ({ diff, format, namePath }) => {
  const expected = getAnswer(`${namePath}.txt`);
  const actualValue = formatter(diff(filepath1, filepath2), format);
  expect(actualValue).toBe(expected);
});
