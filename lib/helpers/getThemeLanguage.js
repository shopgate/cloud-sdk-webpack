const chalk = require('chalk');
const logger = require('../logger');
const i18n = require('../i18n');
const { DEFAULT_LANGUAGE } = require('../variables');
const convertLanguageToISO = require('./convertLanguageToISO');

const t = i18n(__filename);

/**
 * Determines a language for a theme. It considers the language files which are located within
 * the locale folder of the theme that is about to be compiled. If a valid language can't be
 * determined, it will fallback to a default one or the first available.
 * @param {Array} availableLanguages A list of languages which are available within the theme.
 * @param {string} locale A locale which is used to pick a language from the available languages
 * @return {string}
 */
module.exports = function getThemeLanguage(availableLanguages, locale) {
  let language;

  const needle = convertLanguageToISO(locale);
  // Decode the language from the locale string.
  const [localeLang] = needle.split('-');
  // Get the first language from the list which matches the language section of the locale.
  const languageMatch = availableLanguages.find(entry => entry.startsWith(localeLang));

  if (availableLanguages.includes(needle)) {
    // An exact match was found.
    language = needle;
  } else if (languageMatch) {
    // An equal language to the desired locale was found.
    language = languageMatch;
  } else if (availableLanguages.includes(DEFAULT_LANGUAGE)) {
    // Nothing was found, so the default language will be used.
    language = DEFAULT_LANGUAGE;
  } else {
    // Add the first language if the previous checks where not successful.
    [language] = availableLanguages;
  }

  logger.log(`  ${t('THEME_LANGUAGE_SET_TO', {
    fileLocale: chalk.bold.green(language),
    guruLocale: chalk.bold.blue(needle),
  })}`);

  return language;
};
