'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _convertLanguageToISO = require('./convertLanguageToISO');

var _convertLanguageToISO2 = _interopRequireDefault(_convertLanguageToISO);

var _variables = require('../variables');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getThemeLanguage = function getThemeLanguage(availableLanguages, language) {
  var needle = (0, _convertLanguageToISO2.default)(language);

  var _availableLanguages = _slicedToArray(availableLanguages, 1),
      match = _availableLanguages[0];

  if (availableLanguages.includes(needle)) {
    match = needle;
  } else if (availableLanguages.includes(_variables.DEFAULT_LANGUAGE)) {
    match = _variables.DEFAULT_LANGUAGE;
  }

  return match || null;
};

exports.default = getThemeLanguage;