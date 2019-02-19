'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var path = require('path');
var fsEx = require('fs-extra');
var MessageFormat = require('messageformat');
var Messages = require('messageformat/messages');

var rootDirectory = path.resolve(__dirname, '..');
var localesDirectory = path.resolve(__dirname, '../locales');

var I18n = function () {
  function I18n() {
    var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';

    _classCallCheck(this, I18n);

    var locales = [locale];

    if (!locales.includes('en')) {
      locales.unshift('en');
    }

    var messageSet = {};
    locales.forEach(function (entry) {
      var localeFilePath = path.resolve(rootDirectory, localesDirectory, entry + '.json');
      messageSet[entry] = fsEx.readJSONSync(localeFilePath);
    });

    var messageFormat = new MessageFormat(locales);
    this.messages = new Messages(messageFormat.compile(messageSet));
    this.messages.locale = locale;
  }

  _createClass(I18n, [{
    key: 'get',
    value: function get(keyPath) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.messages.hasObject(keyPath)) {
        return keyPath;
      }

      return this.messages.get(keyPath, data);
    }
  }]);

  return I18n;
}();

var i18n = void 0;

module.exports = function (modulePath) {
  if (!i18n) {
    i18n = new I18n('en');
  }

  var moduleNamespace = path.relative(rootDirectory, modulePath).replace(/(^(lib|src)+\/)|(\.js$)/ig, '');

  return function (key, data) {
    var keyPath = [moduleNamespace];

    if (Array.isArray(key)) {
      keyPath.push.apply(keyPath, _toConsumableArray(key));
    } else if (typeof key === 'string') {
      keyPath.push(key);
    } else {
      throw new Error('\'' + key + '\' is not a valid message key');
    }

    var message = i18n.get(keyPath, data);

    if (message === keyPath) {
      return key;
    }

    return message;
  };
};

module.exports.I18n = I18n;