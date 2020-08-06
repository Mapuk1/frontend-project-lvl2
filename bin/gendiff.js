#!/usr/bin/env node

import program from 'commander';
import genDiff from '../src/index.js';

program.description('Compares two configuration files and shows a difference.');

program
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2);
    console.log(diff);
  });

program.version(true);

program.option('-f, --format [type]', 'output format');

program.parse(process.argv);
