import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParse from './parsers.js';

const getData = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.uniq(keys1.concat(keys2).sort());
  const result = allKeys.reduce((acc, key) => {
    if (!keys2.includes(key)) {
      acc.push({ name: key, status: 'deleted', value: obj1[key] });
    } else if (!keys1.includes(key)) {
      acc.push({ name: key, status: 'added', value: obj2[key] });
    } else if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      acc.push({ name: key, status: 'modified', children: getData(obj1[key], obj2[key]) });
    } else if (obj1[key] !== obj2[key]) {
      acc.push({
        name: key, status: 'updated', oldValue: obj1[key], newValue: obj2[key],
      });
    } else {
      acc.push({ name: key, status: 'nothing', value: obj2[key] });
    }
    return acc;
  }, []);
  return result;
};

export default (filepath1, filepath2) => {
  const data1 = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf8');
  const data2 = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf8');
  const object1 = getParse(filepath1, data1);
  const object2 = getParse(filepath2, data2);

  return getData(object1, object2);
};
