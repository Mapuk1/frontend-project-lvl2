import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

export default (filepath, data) => {
  const format = path.extname(filepath);
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.safeLoad(data);
    case '.ini':
      return ini.parse(data);
    default:
      throw new Error(`Unknown order state': '${format}'!`);
  }
};
