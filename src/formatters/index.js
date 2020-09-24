import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const formatter = (data, format) => {
  switch (format) {
    case 'plain':
      return plain(data);
    case 'json':
      return json(data);
    case 'stylish':
      return stylish(data);
    default:
      throw new Error(`Unknown order state': '${format}'!`);
  }
};
export default formatter;
