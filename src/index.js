import fs from 'fs';
import path from 'path';
import getParse from './parsers.js';

export default (filepath1, filepath2) => {
  const file1 = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf8');
  const file2 = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf8');
  const obj1 = getParse(filepath1)(file1);
  const obj2 = getParse(filepath2)(file2);
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = keys1.concat(keys2).sort();
  const result = allKeys.reduce((acc, key) => {
    if (!keys2.includes(key)) {
      acc[`- ${key}`] = obj1[key];
    } else if (!keys1.includes(key)) {
      acc[`+ ${key}`] = obj2[key];
    } else if (obj1[key] !== obj2[key]) {
      acc[`- ${key}`] = obj1[key];
      acc[`+ ${key}`] = obj2[key];
    } else {
      acc[`  ${key}`] = obj1[key];
    }
    return acc;
  }, {});
  return JSON
    .stringify(result, null, '  ')
    .split('"')
    .join('')
    .split(',')
    .join('');
};
