import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const file = fs.readFileSync(path.resolve('1.json'), 'utf8');
const file2 = fs.readFileSync(path.resolve('2.json'), 'utf8');

const obj1 = JSON.parse(file);
const obj2 = JSON.parse(file2);

const getStatus = (str) => {
  switch (str) {
    case 'deleted':
      return '- ';
    case 'added':
      return '+ ';
    case 'modified':
      return '  ';
    case 'nothing':
      return '  ';
    default:
      throw new Error(`Unknown order state': '${str}'!`);
  }
};

const getValue = (some) => {
  if (!_.isObject(some)) {
    return some;
  }
  const keys = Object.keys(some);
  return keys.reduce((acc, key) => {
    acc.push({ name: key, status: 'nothing', value: getValue(some[key]) });
    return acc;
  }, []);
};

const formater = (some, depth = 0) => {
  if (!_.isArray(some)) {
    return some;
  }
  const separ = ' ';
  const result = some.flatMap((obj) => {
    const [name, status, value] = Object.keys(obj);
    return `\n${separ.repeat(depth + 2)}${getStatus(obj[status])}${obj[name]}: ${formater(obj[value], depth + 4)}`;
  });
  return `{${result}\n${separ.repeat(depth)}}`;
};

const getD = (o1, o2) => {
  const keys1 = Object.keys(o1);
  const keys2 = Object.keys(o2);
  const allKeys = _.uniq(keys1.concat(keys2).sort());
  const result = allKeys.reduce((acc, key) => {
    if (!keys2.includes(key)) {
      acc.push({ name: key, status: 'deleted', value: getValue(o1[key]) });
    } else if (!keys1.includes(key)) {
      acc.push({ name: key, status: 'added', value: getValue(o2[key]) });
    } else if (_.isObject(o1[key]) && _.isObject(o2[key])) {
      acc.push({ name: key, status: 'modified', value: getD(o1[key], o2[key]) });
    } else if (o1[key] !== o2[key]) {
      acc.push({ name: key, status: 'deleted', oldValue: getValue(o1[key]) }, { name: key, status: 'added', newValue: getValue(o2[key]) });
    } else {
      acc.push({ name: key, status: 'nothing', value: getValue(o2[key]) });
    }
    return acc;
  }, []);
  return result;
  return formater(result);
};
//console.log(getD(obj1, obj2));
console.log(formater(getD(obj1, obj2)).split(',').join(''));
