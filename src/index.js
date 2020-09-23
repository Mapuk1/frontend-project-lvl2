import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParse from './parsers.js';

const getValueDepth = (some) => {
  if (!_.isObject(some)) {
    return some;
  }
  const keys = Object.keys(some);
  return keys.reduce((acc, key) => {
    acc.push({ name: key, status: 'nothing', value: getValueDepth(some[key]) });
    return acc;
  }, []);
};

export default (filepath1, filepath2) => {
  const file1 = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf8');
  const file2 = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf8');
  const object1 = getParse(filepath1)(file1);
  const object2 = getParse(filepath2)(file2);

  const getData = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const allKeys = _.uniq(keys1.concat(keys2).sort());
    const result = allKeys.reduce((acc, key) => {
      if (!keys2.includes(key)) {
        acc.push({ name: key, status: 'deleted', value: getValueDepth(obj1[key]) });
      } else if (!keys1.includes(key)) {
        acc.push({ name: key, status: 'added', value: getValueDepth(obj2[key]) });
      } else if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        acc.push({ name: key, status: 'modified', value: getData(obj1[key], obj2[key]) });
      } else if (obj1[key] !== obj2[key]) {
        acc.push({
          name: key, status: 'updated', oldValue: getValueDepth(obj1[key]), newValue: getValueDepth(obj2[key]),
        });
      } else {
        acc.push({ name: key, status: 'nothing', value: getValueDepth(obj2[key]) });
      }
      return acc;
    }, []);
    return result;
  };
  return getData(object1, object2);
};
