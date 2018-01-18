'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onThemeConfigReady = exports.onThemeIsSet = exports.THEME_CONFIG_READY = exports.THEME_IS_SET = undefined;

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var event = new _events2.default();

var THEME_IS_SET = exports.THEME_IS_SET = 'THEME_IS_SET';
var THEME_CONFIG_READY = exports.THEME_CONFIG_READY = 'THEME_CONFIG_READY';

var onThemeIsSet = exports.onThemeIsSet = function onThemeIsSet(callback) {
  event.addListener(THEME_IS_SET, callback);
};

var onThemeConfigReady = exports.onThemeConfigReady = function onThemeConfigReady(callback) {
  event.addListener(THEME_CONFIG_READY, callback);
};

exports.default = event;