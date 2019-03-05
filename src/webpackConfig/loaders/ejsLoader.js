import { isString, extend, template } from 'lodash';
import { getOptions, parseQuery } from 'loader-utils';

/**
 * Ported from ejs-loader@0.3.1 to avoid audit vulnerability
 * @param {string} source template as string
 * @returns {string}
 */
// eslint-disable-next-line func-names
module.exports = function (source) {
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
