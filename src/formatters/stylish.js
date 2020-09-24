import _ from 'lodash';

const getStatus = (str) => {
  switch (str) {
    case 'deleted':
      return '- ';
    case 'added':
      return '+ ';
    case 'modified':
    case 'nothing':
      return '  ';
    default:
      throw new Error(`Unknown order state': '${str}'!`);
  }
};

const getValueDepth = (some) => {
  if (!_.isObject(some)) {
    return some;
  }
  const keys = Object.keys(some);
  return keys.reduce((acc, key) => {
    acc.push({ name: key, status: 'nothing', children: getValueDepth(some[key]) });
    return acc;
  }, []);
};

const format = (data) => {
  const iter = (some, depth) => {
    if (!_.isArray(some)) {
      return some;
    }
    const indent = ' ';
    const result = some.flatMap((obj) => {
      const {
        name, status, children, value, oldValue, newValue,
      } = obj;
      if (status === 'updated') {
        const oldChildren = getValueDepth(oldValue);
        const newChildren = getValueDepth(newValue);
        const text1 = `\n${indent.repeat(depth + 2)}- ${name}: ${iter(oldChildren, depth + 4)}`;
        const text2 = `\n${indent.repeat(depth + 2)}+ ${name}: ${iter(newChildren, depth + 4)}`;
        return text1 + text2;
      }
      if (children === undefined) {
        const newChildren = getValueDepth(value);
        return `\n${indent.repeat(depth + 2)}${getStatus(status)}${name}: ${iter(newChildren, depth + 4)}`;
      }
      return `\n${indent.repeat(depth + 2)}${getStatus(status)}${name}: ${iter(children, depth + 4)}`;
    });
    return `{${result}\n${indent.repeat(depth)}}`;
  };
  return iter(data, 0).split(',').join('');
};

export default format;
