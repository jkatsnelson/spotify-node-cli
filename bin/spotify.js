#!/usr/bin/env node

/**
 * Module dependencies.
 */

const program = require('commander');
const child_process = require('child_process');
const _ = require('lodash');

const shellWrap = function (cmd) {
  return `(echo 'window = this;'; cat spotify-application/${cmd}.js; echo ';ObjC.import(\"stdlib\");$.exit(0)') | osascript -l JavaScript`
};

const appleCommand = function (cmd) {
  program.command(cmd)
          .action(function() {
            child_process.execSync(shellWrap(cmd))
          });
};

program
  .version('0.0.1');

_.each(['pause', 'play'], appleCommand)

program.parse(process.argv);
