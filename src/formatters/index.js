import plain from './plain.js';
import stylish from './stylish.js';

const formatter = (data, format) => {
  switch (format) {
    case 'plain':
      return plain(data, '').trimRight();
    default:
      return stylish(data, 0).split(',').join('');
  }
};
export default formatter;
