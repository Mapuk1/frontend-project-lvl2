import _ from 'lodash';

const determineValue = (some) => {
  if (!_.isObject(some)) {
    return typeof some === 'string' ? `'${some}'` : some;
  }
  return '[complex value]';
};

const format = (data) => {
  const iter = (some, str) => {
    const result = some.flatMap((obj) => {
      const {
        name, status, children, value, oldValue, newValue,
      } = obj;
      switch (status) {
        case 'modified':
          return iter(children, `${str + name}.`);
        case 'added':
          return `Property '${str}${name}' was added with value: ${determineValue(value)}\n`;
        case 'deleted':
          return `Property '${str}${name}' was removed\n`;
        case 'updated':
          return `Property '${str}${name}' was updated. From ${determineValue(oldValue)} to ${determineValue(newValue)}\n`;
        case 'nothing':
          return [];
        default:
          throw new Error(`Unknown status ${status}`);
      }
    });
    return result.join('');
  };
  return iter(data, '').trimRight();
};
export default format;
