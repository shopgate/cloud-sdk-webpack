'use strict';

var _lodash = require('lodash');

var _loaderUtils = require('loader-utils');

module.exports = function (source) {
  this.cacheable && this.cacheable();
  var query = this.query ? (0, _loaderUtils.parseQuery)(this.query) : {};

  var options = (0, _loaderUtils.getOptions)(this);

  ['escape', 'interpolate', 'evaluate'].forEach(function (templateSetting) {
    var setting = query[templateSetting];
    if ((0, _lodash.isString)(setting)) {
      query[templateSetting] = new RegExp(setting, 'g');
    }
  });

  return 'module.exports = ' + (0, _lodash.template)(source, (0, _lodash.extend)({}, query, options)) + ';';
};