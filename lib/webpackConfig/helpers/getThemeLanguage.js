'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _logger = require('../../logger');

var _convertLanguageToISO = require('./convertLanguageToISO');

var _convertLanguageToISO2 = _interopRequireDefault(_convertLanguageToISO);

var _variables = require('../variables');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getThemeLanguage = function getThemeLanguage(availableLanguages, locale) {
  var logSuffix = void 0;
  var result = void 0;

  var needle = (0, _convertLanguageToISO2.default)(locale);

  var _needle$split = needle.split('-'),
      _needle$split2 = _slicedToArray(_needle$split, 1),
      language = _needle$split2[0];

  var languageMatch = availableLanguages.find(function (entry) {
    return entry.startsWith(language);
  });

  if (availableLanguages.includes(needle)) {
    result = needle;
  } else if (languageMatch) {
    result = languageMatch;
    logSuffix = 'region ignored - fallback to language';
  } else if (availableLanguages.includes(_variables.DEFAULT_LANGUAGE)) {
    result = _variables.DEFAULT_LANGUAGE;
    logSuffix = 'fallback to default language';
  } else {
    var _availableLanguages = _slicedToArray(availableLanguages, 1);

    result = _availableLanguages[0];

    logSuffix = 'fallback to first available language';
  }

  logSuffix = logSuffix ? '(' + logSuffix + ')' : '';
  _logger.logHelper.logger.log('Theme language set to ' + _chalk2.default.bold.green(result) + ' ' + logSuffix + '\n');

  return result;
};

exports.default = getThemeLanguage;