'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _camelCase = require('lodash/camelCase');

var _camelCase2 = _interopRequireDefault(_camelCase);

var _has = require('lodash/has');

var _has2 = _interopRequireDefault(_has);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _upperFirst = require('lodash/upperFirst');

var _upperFirst2 = _interopRequireDefault(_upperFirst);

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _environment = require('../../environment');

var _Themes = require('../../Themes');

var _Themes2 = _interopRequireDefault(_Themes);

var _logger = require('../../logger');

var _logger2 = _interopRequireDefault(_logger);

var _variables = require('../variables');

var _getComponentsSettings = require('./getComponentsSettings');

var _getComponentsSettings2 = _interopRequireDefault(_getComponentsSettings);

var _i18n = require('../../i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var t = (0, _i18n2.default)(__filename);

var TYPE_WIDGETS = 'WIDGETS';
var TYPE_TRACKERS = 'TRACKERS';
var TYPE_PORTALS = 'PORTALS';
var TYPE_REDUCERS = 'REDUCERS';
var TYPE_SUBSCRIBERS = 'SUBSCRIBERS';
var TYPE_TRANSLATIONS = 'TRANSLATIONS';

var defaultFileContent = 'export default {};\n';

var getExtensionFolderPath = function getExtensionFolderPath() {
  return _path2.default.resolve(_Themes2.default.getPath(), 'extensions');
};

var componentExists = function componentExists(componentPath) {
  var existsInExtensions = (0, _fs.existsSync)(_path2.default.resolve(_variables.EXTENSIONS_PATH, componentPath));
  var existsInWidgets = (0, _fs.existsSync)(_path2.default.resolve(_Themes2.default.getPath(), 'widgets', componentPath));

  if (!existsInExtensions && !existsInWidgets) {
    return false;
  }

  return true;
};

var getVariableName = function getVariableName(id) {
  return (0, _upperFirst2.default)((0, _camelCase2.default)(id.replace(/@/g, '').replace(/\//g, '-')));
};

var readConfig = function readConfig(options) {
  return new _bluebird2.default(function (resolve, reject) {
    var type = options.type,
        config = options.config,
        _options$importsStart = options.importsStart,
        importsStart = _options$importsStart === undefined ? null : _options$importsStart,
        _options$importsEnd = options.importsEnd,
        importsEnd = _options$importsEnd === undefined ? null : _options$importsEnd,
        _options$exportsStart = options.exportsStart,
        exportsStart = _options$exportsStart === undefined ? 'export default {' : _options$exportsStart,
        _options$exportsEnd = options.exportsEnd,
        exportsEnd = _options$exportsEnd === undefined ? '};' : _options$exportsEnd,
        _options$isArray = options.isArray,
        isArray = _options$isArray === undefined ? false : _options$isArray;


    if (!config || !(0, _isPlainObject2.default)(config)) {
      return reject(new TypeError(t('SUPPLIED_CONFIG_IS_NOT_AN_OBJECT', { typeofConfig: typeof config === 'undefined' ? 'undefined' : _typeof(config) })));
    }

    var imports = importsStart ? [importsStart] : [];
    var exports = [exportsStart];
    var themePackage = require(_Themes2.default.getPath() + '/package.json');

    if ((type === TYPE_PORTALS || type === TYPE_WIDGETS) && (0, _has2.default)(themePackage.dependencies, 'react-loadable')) {
      imports.push('import Loadable from \'react-loadable\';');
      imports.push('import Loading from \'@shopgate/pwa-common/components/Loading\';');
      imports.push('');
    }

    try {
      Object.keys(config).forEach(function (id) {
        var component = config[id];
        var componentPath = _environment.isDev ? component.path.replace('/dist/', '/src/') : component.path;

        if (!componentExists(componentPath)) {
          return;
        }

        var variableName = getVariableName(id);

        var isPortalsOrWidgets = type === TYPE_PORTALS && component.target !== 'app.routes' || type === TYPE_WIDGETS;

        if (isPortalsOrWidgets && (0, _has2.default)(themePackage.dependencies, 'react-loadable')) {
          imports.push('const ' + variableName + ' = Loadable({\n  loader: () => import(\'' + componentPath + '\'),\n  loading: Loading,\n});\n');
        } else {
          imports.push('import ' + variableName + ' from \'' + componentPath + '\';');
        }

        if (isArray) {
          exports.push('  ' + variableName + ',');
          return;
        }

        exports.push('  \'' + id + '\': ' + variableName + ',');
      });
    } catch (e) {
      return reject(e);
    }

    if (importsEnd) {
      imports.push(importsEnd);
    }

    exports.push(exportsEnd);

    return resolve({
      imports: imports,
      exports: exports
    });
  });
};

var getIndexLogTranslations = function getIndexLogTranslations() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : TYPE_WIDGETS;

  var params = { type: t('TYPE_' + type) };

  return {
    logStart: '  ' + t('INDEXING_TYPE', params),
    logEnd: '  ' + t('INDEXED_TYPE', params),
    logNotFound: '  ' + t('NO_EXTENSIONS_FOUND_FOR_TYPE', params)
  };
};

var validateExtensions = function validateExtensions(input) {
  return new _bluebird2.default(function (resolve, reject) {
    try {
      var extensionPath = getExtensionFolderPath();

      if (!(0, _fs.existsSync)(extensionPath)) {
        (0, _fs.mkdirSync)(extensionPath);
      }

      if (!input.imports.length) {
        return resolve(null);
      }

      return resolve(input);
    } catch (e) {
      return reject(new Error(t('EXTENSION_COULD_NOT_BE_VALIDATED')));
    }
  });
};

var createStrings = function createStrings(input) {
  return new _bluebird2.default(function (resolve, reject) {
    try {
      if (!input) {
        return resolve(null);
      }

      var importsString = input.imports.length ? input.imports.join('\n') + '\n\n' : '';
      var exportsString = input.exports.length ? input.exports.join('\n') + '\n' : '';
      var indexString = ('' + importsString + exportsString).replace('\n\n\n', '\n\n');

      return resolve(indexString.length ? indexString : null);
    } catch (e) {
      return reject(new Error(t('STRINGS_COULD_NOT_BE_CREATED')));
    }
  });
};

var writeExtensionFile = function writeExtensionFile(options) {
  return new _bluebird2.default(function (resolve, reject) {
    try {
      var file = options.file,
          input = options.input,
          defaultContent = options.defaultContent,
          logNotFound = options.logNotFound,
          logEnd = options.logEnd;

      var filePath = _path2.default.resolve(getExtensionFolderPath(), file);

      if (!input) {
        _logger2.default.warn(logNotFound);
        (0, _fs.writeFileSync)(filePath, defaultContent, { flag: 'w+' });
        return resolve();
      }

      (0, _fs.writeFileSync)(filePath, input, { flag: 'w+' });
      _logger2.default.log(logEnd);
      return resolve();
    } catch (e) {
      return reject(e);
    }
  });
};

var index = function index(options) {
  var file = options.file,
      config = options.config,
      logStart = options.logStart,
      logNotFound = options.logNotFound,
      logEnd = options.logEnd,
      _options$defaultConte = options.defaultContent,
      defaultContent = _options$defaultConte === undefined ? defaultFileContent : _options$defaultConte;


  _logger2.default.log(logStart);

  return readConfig(config).then(function (input) {
    return validateExtensions(input);
  }).then(function (input) {
    return createStrings(input);
  }).then(function (input) {
    return writeExtensionFile({
      input: input,
      file: file,
      defaultContent: defaultContent,
      logNotFound: logNotFound,
      logEnd: logEnd
    });
  });
};

var indexWidgets = function indexWidgets() {
  var _getComponentsSetting = (0, _getComponentsSettings2.default)(),
      _getComponentsSetting2 = _getComponentsSetting.widgets,
      widgets = _getComponentsSetting2 === undefined ? {} : _getComponentsSetting2;

  return index(_extends({
    file: 'widgets.js',
    config: {
      type: TYPE_WIDGETS,
      config: widgets
    }
  }, getIndexLogTranslations(TYPE_WIDGETS)));
};

var indexTracking = function indexTracking() {
  var _getComponentsSetting3 = (0, _getComponentsSettings2.default)(),
      _getComponentsSetting4 = _getComponentsSetting3.tracking,
      tracking = _getComponentsSetting4 === undefined ? {} : _getComponentsSetting4;

  return index(_extends({
    file: 'tracking.js',
    config: {
      type: TYPE_TRACKERS,
      config: tracking
    }
  }, getIndexLogTranslations(TYPE_TRACKERS)));
};

var indexPortals = function indexPortals() {
  var _getComponentsSetting5 = (0, _getComponentsSettings2.default)(),
      _getComponentsSetting6 = _getComponentsSetting5.portals,
      portals = _getComponentsSetting6 === undefined ? {} : _getComponentsSetting6;

  return index(_extends({
    file: 'portals.js',
    config: {
      type: TYPE_PORTALS,
      config: portals,
      importsStart: 'import portalCollection from \'@shopgate/pwa-common/helpers/portals/portalCollection\';',
      exportsStart: 'portalCollection.registerPortals({',
      exportsEnd: '});'
    }
  }, getIndexLogTranslations(TYPE_PORTALS)));
};

var indexReducers = function indexReducers() {
  var _getComponentsSetting7 = (0, _getComponentsSettings2.default)(),
      _getComponentsSetting8 = _getComponentsSetting7.reducers,
      reducers = _getComponentsSetting8 === undefined ? {} : _getComponentsSetting8;

  return index(_extends({
    file: 'reducers.js',
    config: {
      type: TYPE_REDUCERS,
      config: reducers
    },
    defaultContent: 'export default null;\n'
  }, getIndexLogTranslations(TYPE_REDUCERS)));
};

var indexSubscribers = function indexSubscribers() {
  var _getComponentsSetting9 = (0, _getComponentsSettings2.default)(),
      _getComponentsSetting10 = _getComponentsSetting9.subscribers,
      subscribers = _getComponentsSetting10 === undefined ? {} : _getComponentsSetting10;

  return index(_extends({
    file: 'subscribers.js',
    config: {
      type: TYPE_SUBSCRIBERS,
      config: subscribers,
      exportsStart: 'export default [',
      exportsEnd: '];',
      isArray: true
    },
    defaultContent: 'export default [];\n'
  }, getIndexLogTranslations(TYPE_SUBSCRIBERS)));
};

var indexTranslations = function indexTranslations() {
  var _getComponentsSetting11 = (0, _getComponentsSettings2.default)(),
      _getComponentsSetting12 = _getComponentsSetting11.translations,
      translations = _getComponentsSetting12 === undefined ? {} : _getComponentsSetting12;

  return index(_extends({
    file: 'translations.js',
    config: {
      type: TYPE_TRANSLATIONS,
      config: translations
    },
    defaultContent: 'export default null;\n'
  }, getIndexLogTranslations(TYPE_TRANSLATIONS)));
};

var createIndexes = function createIndexes() {
  return _bluebird2.default.all([indexWidgets(), indexTracking(), indexPortals(), indexReducers(), indexSubscribers(), indexTranslations()]);
};

exports.default = createIndexes;