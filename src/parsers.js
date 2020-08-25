import path from 'path';
import yaml from 'js-yaml';

export default (filepath) => {
  let parse;
  const format = path.extname(filepath);
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml') {
    parse = yaml.safeLoad;
  }
  return parse;
};
