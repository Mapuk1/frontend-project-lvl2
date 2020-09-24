import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

export default (filepath) => {
  const format = path.extname(filepath);
  switch (format) {
    case '.json':
      return JSON.parse;
    case '.yml':
      return yaml.safeLoad;
    case '.ini':
      return ini.parse;
    default:
      throw new Error(`Unknown order state': '${format}'!`);
  }
};
