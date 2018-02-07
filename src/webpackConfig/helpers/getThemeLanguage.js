/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk';
import { logHelper } from 'Src/logger';
import convertLanguageToISO from './convertLanguageToISO';
import { DEFAULT_LANGUAGE } from '../variables';

/**
 * Determines a language for a theme. It considers the language files which are located within
 * the locale folder of the theme that is about to be compiled. If a valid language can't be
 * determined, it will fallback to a default one or the first available.
 * @param {Array} availableLanguages A list of languages which are available within the theme.
 * @param {string} locale A locale which is used to pick a language from the available languages
 * @return {string}
 */
const getThemeLanguage = (availableLanguages, locale) => {
  let logSuffix;
  let result;

  const needle = convertLanguageToISO(locale);
  // Decode the language from the locale string
  const [language] = needle.split('-');
  // Get the first language from the list which matches the language section of the locale
  const languageMatch = availableLanguages.find(entry => entry.startsWith(language));

  if (availableLanguages.includes(needle)) {
    // An exact match was found
    result = needle;
  } else if (languageMatch) {
    // An equal language to the desired locale was found
    result = languageMatch;
    logSuffix = 'region ignored - fallback to language';
  } else if (availableLanguages.includes(DEFAULT_LANGUAGE)) {
    // Nothing was found, so the default language will be used
    result = DEFAULT_LANGUAGE;
    logSuffix = 'fallback to default language';
  } else {
    // Add the first language if the previous checks where not successful
    [result] = availableLanguages;
    logSuffix = 'fallback to first available language';
  }

  logSuffix = logSuffix ? `(${logSuffix})` : '';
  logHelper.logger.log(`Theme language set to ${chalk.bold.green(result)} ${logSuffix}\n`);

  return result;
};

export default getThemeLanguage;
