'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var languageFormat = /^('[a-z]{2}-[a-z]{2}')$/;

var convertLanguageToISO = function convertLanguageToISO(language) {
  if (!languageFormat.test('\'' + language + '\'')) {
    return language;
  }

  var elements = language.split('-');
  return elements[0] + '-' + elements[1].toUpperCase();
};

exports.default = convertLanguageToISO;