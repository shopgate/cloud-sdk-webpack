'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TYPE_WIDGETS = 'WIDGETS';
var TYPE_TRACKING = 'TRACKING';
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
      return reject(new TypeError('The supplied component config is not an object! Received \'' + (typeof config === 'undefined' ? 'undefined' : _typeof(config)) + '\''));
    }

    var imports = importsStart ? [importsStart] : [];
    var exports = [exportsStart];
    var themePackage = require(_Themes2.default.getPath() + '/package.json');

    console.warn(themePackage.dependencies);
    console.warn((0, _has2.default)(themePackage.dependencies, 'react-loadable'));

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

        if (type !== TYPE_PORTALS && type !== TYPE_WIDGETS || !(0, _has2.default)(themePackage.dependencies, 'react-loadable')) {
          imports.push('import ' + variableName + ' from \'' + componentPath + '\';');
        } else {
          imports.push('const ' + variableName + ' = Loadable({\n  loader: () => import(\'' + componentPath + '\'),\n  loading: Loading,\n});\n');
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
      return reject(new Error('Extension could not be validated!'));
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
      var indexString = '' + importsString + exportsString;

      return resolve(indexString.length ? indexString : null);
    } catch (e) {
      return reject(new Error('Strings could not be created!'));
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
      _options$logStart = options.logStart,
      logStart = _options$logStart === undefined ? '  Indexing ...' : _options$logStart,
      _options$logNotFound = options.logNotFound,
      logNotFound = _options$logNotFound === undefined ? '  No extensions found!' : _options$logNotFound,
      _options$logEnd = options.logEnd,
      logEnd = _options$logEnd === undefined ? '  ... widgets indexed.' : _options$logEnd,
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

  return index({
    file: 'widgets.js',
    config: {
      type: TYPE_WIDGETS,
      config: widgets
    },
    logStart: '  Indexing widgets ...',
    logNotFound: '  No extensions found for \'widgets\'',
    logEnd: ' ... widgets indexed.'
  });
};

var indexTracking = function indexTracking() {
  var _getComponentsSetting3 = (0, _getComponentsSettings2.default)(),
      _getComponentsSetting4 = _getComponentsSetting3.tracking,
      tracking = _getComponentsSetting4 === undefined ? {} : _getComponentsSetting4;

  return index({
    file: 'tracking.js',
    config: {
      type: TYPE_TRACKING,
      config: tracking
    },
    logStart: '  Indexing trackers ...',
    logNotFound: '  No extensions found for \'tracking\'',
    logEnd: ' ... trackers indexed.'
  });
};

var indexPortals = function indexPortals() {
  var _getComponentsSetting5 = (0, _getComponentsSettings2.default)(),
      _getComponentsSetting6 = _getComponentsSetting5.portals,
      portals = _getComponentsSetting6 === undefined ? {} : _getComponentsSetting6;

  return index({
    file: 'portals.js',
    config: {
      type: TYPE_PORTALS,
      config: portals,
      importsStart: 'import portalCollection from \'@shopgate/pwa-common/helpers/portals/portalCollection\';',
      exportsStart: 'portalCollection.registerPortals({',
      exportsEnd: '});'
    },
    logStart: '  Indexing portals ...',
    logNotFound: '  No extensions found for \'portals\'',
    logEnd: ' ... portals indexed.'
  });
};

var indexReducers = function indexReducers() {
  var _getComponentsSetting7 = (0, _getComponentsSettings2.default)(),
      _getComponentsSetting8 = _getComponentsSetting7.reducers,
      reducers = _getComponentsSetting8 === undefined ? {} : _getComponentsSetting8;

  return index({
    file: 'reducers.js',
    config: {
      type: TYPE_REDUCERS,
      config: reducers
    },
    logStart: '  Indexing reducers ...',
    logNotFound: '  No extensions found for \'reducers\'',
    logEnd: ' ... reducers indexed.',
    defaultContent: 'export default null;\n'
  });
};

var indexSubscribers = function indexSubscribers() {
  var _getComponentsSetting9 = (0, _getComponentsSettings2.default)(),
      _getComponentsSetting10 = _getComponentsSetting9.subscribers,
      subscribers = _getComponentsSetting10 === undefined ? {} : _getComponentsSetting10;

  return index({
    file: 'subscribers.js',
    config: {
      type: TYPE_SUBSCRIBERS,
      config: subscribers,
      exportsStart: 'export default [',
      exportsEnd: '];',
      isArray: true
    },
    logStart: '  Indexing subscribers ...',
    logNotFound: '  No extensions found for \'subscribers\'',
    logEnd: ' ... subscribers indexed.',
    defaultContent: 'export default [];\n'
  });
};

var indexTranslations = function indexTranslations() {
  var _getComponentsSetting11 = (0, _getComponentsSettings2.default)(),
      _getComponentsSetting12 = _getComponentsSetting11.translations,
      translations = _getComponentsSetting12 === undefined ? {} : _getComponentsSetting12;

  return index({
    file: 'translations.js',
    config: {
      type: TYPE_TRANSLATIONS,
      config: translations
    },
    logStart: '  Indexing translations ...',
    logNotFound: '  No extensions found for \'translations\'',
    logEnd: ' ... translations indexed.',
    defaultContent: 'export default null;\n'
  });
};

var createIndexes = function createIndexes() {
  return _bluebird2.default.all([indexWidgets(), indexTracking(), indexPortals(), indexReducers(), indexSubscribers(), indexTranslations()]);
};

exports.default = createIndexes;