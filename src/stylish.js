import _ from 'lodash';

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

export default formater;
