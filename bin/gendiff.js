#!/usr/bin/env node

import genDiff from '../src/index.js';
import program from 'commander';

program.description('Compares two configuration files and shows a difference.')

program.arguments('<filepath1> <filepath2>')
.action(function (filepath1, filepath2) {   
    const diff = genDiff(filepath1, filepath2)
    console.log(diff);
});

program.version(true)

program
.option('-f, --format [type]', 'output format')

program.parse(process.argv)
