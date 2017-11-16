'use strict';

var _child_process = require('child_process');

var _path = require('path');

try {
  (0, _child_process.fork)((0, _path.join)(__dirname, './webpack'));
} catch (error) {
  throw error;
}