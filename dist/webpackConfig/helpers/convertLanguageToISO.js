'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

var languageFormat = /^('[a-z]{2}-[a-z]{2}')$/;

/**
 * Converts a lowercase language key to ISO conform lower-uppercase.
 * Returns the key unchanged when is not given in correct format.
 * @param {string} language The received language.
 * @return {string} The converted language.
 */
var convertLanguageToISO = function convertLanguageToISO(language) {
  if (!languageFormat.test('\'' + language + '\'')) {
    return language;
  }

  var elements = language.split('-');
  return elements[0] + '-' + elements[1].toUpperCase();
};

exports.default = convertLanguageToISO;