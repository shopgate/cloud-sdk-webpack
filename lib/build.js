'use strict';

var _child_process = require('child_process');

var _path = require('path');

try {
  var webpackProcess = (0, _child_process.fork)((0, _path.join)(__dirname, './webpack'));
  webpackProcess.on('exit', function (code) {
    return process.exit(code);
  });
} catch (error) {
  throw error;
}