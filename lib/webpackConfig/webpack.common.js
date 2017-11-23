'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _stringReplaceWebpackPlugin = require('string-replace-webpack-plugin');

var _stringReplaceWebpackPlugin2 = _interopRequireDefault(_stringReplaceWebpackPlugin);

var _convertLanguageToISO = require('./helpers/convertLanguageToISO');

var _convertLanguageToISO2 = _interopRequireDefault(_convertLanguageToISO);

var _getAppSettings2 = require('./helpers/getAppSettings');

var _getAppSettings3 = _interopRequireDefault(_getAppSettings2);

var _getExtensionsNodeModulesPaths = require('./helpers/getExtensionsNodeModulesPaths');

var _getExtensionsNodeModulesPaths2 = _interopRequireDefault(_getExtensionsNodeModulesPaths);

var _environment = require('../environment');

var _Themes = require('../Themes');

var _Themes2 = _interopRequireDefault(_Themes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _getAppSettings = (0, _getAppSettings3.default)(),
    language = _getAppSettings.language;

var THEME_PATH = _Themes2.default.getPath();
var LANG = (0, _convertLanguageToISO2.default)(language);
var NODE_MODULES = 'node_modules';
var LOCAL_NODE_MODULES = (0, _path.resolve)(__dirname, '..', '..', NODE_MODULES);
var SDK_NODE_MODULES = (0, _path.resolve)(process.env.SDK_PATH, NODE_MODULES);

var stringReplacementLoader = _stringReplaceWebpackPlugin2.default.replace({
  replacements: [{
    pattern: /__PROJECT_PATH__/g,
    replacement: function replacement() {
      return JSON.stringify(THEME_PATH);
    }
  }]
});

exports.default = {
  context: (0, _path.resolve)(THEME_PATH),
  devServer: {
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    publicPath: '/',
    contentBase: (0, _path.resolve)(THEME_PATH, 'public'),
    progress: true
  },
  entry: {
    common: [(0, _path.resolve)(SDK_NODE_MODULES, 'babel-polyfill'), (0, _path.resolve)(SDK_NODE_MODULES, 'intl'), (0, _path.resolve)(SDK_NODE_MODULES, 'intl/locale-data/jsonp/' + LANG + '.js'), 'react', 'react-dom', (0, _path.resolve)(__dirname, './helpers/polyfill')]
  },
  externals: {
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [(0, _path.resolve)(SDK_NODE_MODULES, 'style-loader'), (0, _path.resolve)(SDK_NODE_MODULES, 'css-loader')]
    }, {
      test: /\.json$/,
      use: [(0, _path.resolve)(SDK_NODE_MODULES, 'json-loader')]
    }, {
      test: /\.svg$/,
      use: [(0, _path.resolve)(SDK_NODE_MODULES, 'svg-inline-loader')]
    }, {
      test: /\.ejs/,
      use: [(0, _path.resolve)(SDK_NODE_MODULES, 'ejs-loader')]
    }, {
      test: /\.(js|jsx)$/,
      exclude: [(0, _path.resolve)(process.env.SDK_PATH), (0, _path.resolve)(process.env.SDK_PATH, 'bin')],
      use: [stringReplacementLoader, (0, _path.resolve)(SDK_NODE_MODULES, 'cache-loader'), {
        loader: (0, _path.resolve)(SDK_NODE_MODULES, 'babel-loader'),
        options: {
          compact: true,
          comments: !!_environment.isDev,
          sourceRoot: THEME_PATH,
          cacheDirectory: !_environment.isDev
        }
      }]
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    modules: [(0, _path.resolve)(THEME_PATH, NODE_MODULES), (0, _path.resolve)(SDK_NODE_MODULES), (0, _path.resolve)(LOCAL_NODE_MODULES)].concat(_toConsumableArray((0, _getExtensionsNodeModulesPaths2.default)()))
  },
  performance: {
    hints: false
  },
  target: 'web',
  watchOptions: {
    ignored: /node_modules\b(?!\/@shopgate)\b.*/
  }
};