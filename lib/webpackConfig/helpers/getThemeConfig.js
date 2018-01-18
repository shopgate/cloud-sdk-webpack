'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _requireUncached = require('require-uncached');

var _requireUncached2 = _interopRequireDefault(_requireUncached);

var _Themes = require('../../Themes');

var _Themes2 = _interopRequireDefault(_Themes);

var _getAppSettings2 = require('./getAppSettings');

var _getAppSettings3 = _interopRequireDefault(_getAppSettings2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getContrastColor = function getContrastColor(bgColor, colors) {
  var cutoff = 0.74;

  var perceivedLuminosity = (0, _color2.default)(bgColor).luminosity();

  return perceivedLuminosity >= cutoff ? colors.dark : colors.light;
};

var getFocusColor = function getFocusColor(colors) {
  if ((0, _color2.default)(colors.primary).luminosity() >= 0.8) {
    return colors.accent;
  }
  return colors.primary;
};

var applyContrastColors = function applyContrastColors(config) {
  var colors = config.colors;


  return _extends({}, config, {
    colors: _extends({}, colors, {
      primaryContrast: getContrastColor(colors.primary, colors),
      accentContrast: getContrastColor(colors.accent, colors),
      focus: getFocusColor(colors)
    })
  });
};

var applyCustomColors = function applyCustomColors(config) {
  var _getAppSettings = (0, _getAppSettings3.default)(),
      colors = _getAppSettings.colors;

  if (!config.hasOwnProperty('colors')) {
    return _extends({}, config, {
      colors: colors
    });
  }

  return _extends({}, config, {
    colors: _extends({}, config.colors, colors)
  });
};

var getThemeConfig = function getThemeConfig() {
  try {
    var rawConfig = (0, _requireUncached2.default)(_Themes2.default.getPath() + '/theme-config');
    var config = applyCustomColors(rawConfig);
    return applyContrastColors(config);
  } catch (e) {
    return {};
  }
};

exports.default = getThemeConfig;