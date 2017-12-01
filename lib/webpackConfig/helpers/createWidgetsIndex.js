'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _camelCase = require('lodash/camelCase');

var _camelCase2 = _interopRequireDefault(_camelCase);

var _upperFirst = require('lodash/upperFirst');

var _upperFirst2 = _interopRequireDefault(_upperFirst);

var _environment = require('../../environment');

var _Themes = require('../../Themes');

var _Themes2 = _interopRequireDefault(_Themes);

var _path = require('path');

var _fs = require('fs');

var _logger = require('../../logger');

var _logger2 = _interopRequireDefault(_logger);

var _getComponentsSettings = require('./getComponentsSettings');

var _getComponentsSettings2 = _interopRequireDefault(_getComponentsSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createWidgetsIndex = function createWidgetsIndex() {
  var _getComponentsSetting = (0, _getComponentsSettings2.default)(),
      widgets = _getComponentsSetting.widgets;

  var imports = [];
  var exports = ['export default {'];

  Object.keys(widgets).forEach(function (widgetId) {
    var widget = widgets[widgetId];
    var widgetPath = _environment.isDev ? widget.path.replace('/dist/', '/src/') : widget.path;

    var widgetVariableName = (0, _upperFirst2.default)((0, _camelCase2.default)(widgetId.replace(/@/g, '').replace(/\//g, '-')));

    imports.push('import ' + widgetVariableName + ' from \'./' + widgetPath + '\';');

    exports.push('  \'' + widgetId + '\': ' + widgetVariableName + ',');
  });

  exports.push('};');

  _logger2.default.log('\n  Indexing widgets ...\n');

  var importsString = imports.length ? imports.join('\n') + '\n\n' : '';
  var indexString = '' + importsString + exports.join('\n') + '\n';
  var widgetsFolder = (0, _path.resolve)(_Themes2.default.getPath(), 'widgets');

  if (!(0, _fs.existsSync)(widgetsFolder)) {
    (0, _fs.mkdirSync)(widgetsFolder);
  }

  var indexFile = (0, _path.resolve)(_Themes2.default.getPath(), 'widgets', 'index.js');

  (0, _fs.writeFileSync)(indexFile, indexString, { flag: 'w+' });
};

exports.default = createWidgetsIndex;