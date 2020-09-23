import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const formatter = (data, format) => {
  switch (format) {
    case 'plain':
      return plain(data, '').trimRight();
    case 'json':
      return json(data);
    default:
      return stylish(data, 0).split(',').join('');
  }
};
export default formatter;
