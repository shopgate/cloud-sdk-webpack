'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = require('fs');

var _requireUncached = require('require-uncached');

var _requireUncached2 = _interopRequireDefault(_requireUncached);

var _Themes = require('../../Themes');

var _Themes2 = _interopRequireDefault(_Themes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getComponentsSettings = function getComponentsSettings() {
  try {
    var themePath = _Themes2.default.getPath();
    var themeWidgets = themePath + '/widgets';
    var themeConfig = themeWidgets + '/widgets.json';

    var defaultConfig = (0, _requireUncached2.default)(themePath + '/config/components.json');

    var configExists = (0, _fs.existsSync)(themeWidgets) && (0, _fs.existsSync)(themeConfig);
    var config = configExists ? (0, _requireUncached2.default)(themeConfig) : {};

    return _extends({}, defaultConfig, {
      widgets: _extends({}, defaultConfig.widgets, config)
    });
  } catch (e) {
    return {};
  }
};

exports.default = getComponentsSettings;