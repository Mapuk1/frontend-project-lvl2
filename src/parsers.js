import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

export default (filepath) => {
  const fileFormat = path.extname(filepath);
  switch (fileFormat) {
    case '.json':
      return JSON.parse;
    case '.yml':
      return yaml.safeLoad;
    case '.ini':
      return ini.parse;
    default:
      throw new Error(`Unknown order state': '${fileFormat}'!`);
  }
};
