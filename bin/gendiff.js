#!/usr/bin/env node

import program from 'commander';
import genDiff from '../src/index.js';
import format from '../src/formatters/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version(true)
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2);
    const result = format(diff, program.format);
    console.log(result);
  })
  .parse(process.argv);
