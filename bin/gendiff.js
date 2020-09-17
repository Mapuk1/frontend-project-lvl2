#!/usr/bin/env node

import program from 'commander';
import genDiff from '../src/index.js';
import stylish from '../src/stylish.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version(true)
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2);
    if (program.format === 'stylish') {
      console.log(stylish(diff, 0).split(',').join(''));
    }
  })
  .parse(process.argv);
