const { isString, extend, template } = require('lodash');
const { getOptions, parseQuery } = require('loader-utils');

/**
 * Ported from ejs-loader@0.3.1 to avoid audit vulnerability
 * @param {string} source template as string
 * @returns {string}
 */
module.exports = (source) => {
  // eslint-disable-next-line no-unused-expressions
  this.cacheable && this.cacheable();
  const query = this.query ? parseQuery(this.query) : {};

  const options = getOptions(this);

  ['escape', 'interpolate', 'evaluate'].forEach((templateSetting) => {
    const setting = query[templateSetting];
    if (isString(setting)) {
      query[templateSetting] = new RegExp(setting, 'g');
    }
  });

  return `module.exports = ${template(source, extend({}, query, options))};`;
};
