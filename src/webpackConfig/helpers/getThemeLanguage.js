/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import convertLanguageToISO from './convertLanguageToISO';
import { DEFAULT_LANGUAGE } from '../variables';

/**
 * Determines a language for a theme. It considers the language files which are located within
 * the locale folder of the theme that is about to be compiled. If a valid language can't be
 * determined, it will fallback to a default one or the first available.
 * @param {Array} availableLanguages A list of languages which are available within the theme.
 * @param {string} language The desired language that was configured for the app.
 * @return {string | null}
 */
const getThemeLanguage = (availableLanguages, language) => {
  const needle = convertLanguageToISO(language);

  let [match] = availableLanguages;

  if (availableLanguages.includes(needle)) {
    match = needle;
  } else if (availableLanguages.includes(DEFAULT_LANGUAGE)) {
    match = DEFAULT_LANGUAGE;
  }

  return match || null;
};

export default getThemeLanguage;
