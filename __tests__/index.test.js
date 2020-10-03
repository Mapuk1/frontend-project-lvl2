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

const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);

const getAnswer = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf8').trimRight();

const filepath1 = getFixturePath('1.json');
const filepath2 = getFixturePath('2.json');
const diff = gendiff(filepath1, filepath2);

test.each`
  data     | formatter      | namePath
  ${diff}  | ${stylish}     | ${'diffStylish'}
  ${diff}  | ${json}        | ${'diffJson'}
  ${diff}  | ${plain}       | ${'diffPlain'}
`('$namePath', ({ data, formatter, namePath }) => {
  const expected = getAnswer(`${namePath}.txt`);
  const actualValue = formatter(data);
  expect(actualValue).toBe(expected);
});
