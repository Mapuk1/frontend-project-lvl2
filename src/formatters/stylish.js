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

const formater = (some, depth) => {
  if (!_.isArray(some)) {
    return some;
  }
  const indent = ' ';
  const result = some.flatMap((obj) => {
    const {
      name, status, value, oldValue, newValue,
    } = obj;
    if (status === 'updated') {
      const text1 = `\n${indent.repeat(depth + 2)}- ${name}: ${formater(oldValue, depth + 4)}`;
      const text2 = `\n${indent.repeat(depth + 2)}+ ${name}: ${formater(newValue, depth + 4)}`;
      return text1 + text2;
    }
    return `\n${indent.repeat(depth + 2)}${getStatus(status)}${name}: ${formater(value, depth + 4)}`;
  });
  return `{${result}\n${indent.repeat(depth)}}`;
};

export default formater;
