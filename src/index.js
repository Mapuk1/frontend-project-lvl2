import fs from 'fs';
import path from 'path';

export default (filepath1, filepath2) => {
  const file1 = fs.readFileSync(path.resolve(process.cwd(), filepath1));
  const file2 = fs.readFileSync(path.resolve(process.cwd(), filepath2));
  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);
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
