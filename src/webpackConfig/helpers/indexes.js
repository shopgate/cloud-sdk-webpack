/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'path';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import camelCase from 'lodash/camelCase';
import has from 'lodash/has';
import Promise from 'bluebird';
import upperFirst from 'lodash/upperFirst';
import isPlainObject from 'lodash/isPlainObject';
import { isDev } from 'Src/environment';
import themes from 'Src/Themes';
import logger from 'Src/logger';
import { EXTENSIONS_PATH } from '../variables';
import getComponentsSettings from './getComponentsSettings';
import i18n from '../../i18n';

const t = i18n(__filename);

const TYPE_WIDGETS = 'WIDGETS';
const TYPE_TRACKERS = 'TRACKERS';
const TYPE_PORTALS = 'PORTALS';
const TYPE_REDUCERS = 'REDUCERS';
const TYPE_SUBSCRIBERS = 'SUBSCRIBERS';
const TYPE_TRANSLATIONS = 'TRANSLATIONS';

const defaultFileContent = 'export default {};\n';

/**
 * Returns the extension folder path.
 * @return {string}
 */
const getExtensionFolderPath = () => path.resolve(themes.getPath(), 'extensions');

/**
 * Checks if the component exists.
 * @param {string} componentPath The component path.
 * @return {boolean}
 */
const componentExists = (componentPath) => {
  const existsInExtensions = existsSync(path.resolve(EXTENSIONS_PATH, componentPath));
  const existsInWidgets = existsSync(path.resolve(themes.getPath(), 'widgets', componentPath));

  if (!existsInExtensions && !existsInWidgets) {
    return false;
  }

  return true;
};

/**
 * Returns the generated component variable name.
 * @param {string} id The component ID.
 * @return {string}
 */
const getVariableName = id => upperFirst(camelCase(id.replace(/@/g, '').replace(/\//g, '-')));

/**
 * Reads the components config and creates import and export variables.
 * @param {Object} options The read config options.
 * @return {Promise}
 */
const readConfig = options => new Promise((resolve, reject) => {
  const {
    type,
    config,
    importsStart = null,
    importsEnd = null,
    exportsStart = 'export default {',
    exportsEnd = '};',
    isArray = false,
  } = options;

  if (!config || !isPlainObject(config)) {
    return reject(new TypeError(t('SUPPLIED_CONFIG_IS_NOT_AN_OBJECT', { typeofConfig: typeof config })));
  }

  const imports = importsStart ? [importsStart] : []; // Holds the import strings.
  const exports = [exportsStart]; // Holds the export strings.

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const themePackage = require(`${themes.getPath()}/package.json`);

  if ((type === TYPE_PORTALS || type === TYPE_WIDGETS) && has(themePackage.dependencies, 'react-loadable')) {
    imports.push('import Loadable from \'react-loadable\';');
    imports.push('import Loading from \'@shopgate/pwa-common/components/Loading\';');
    imports.push('');
  }

  try {
    Object.keys(config).forEach((id) => {
      const component = config[id];
      const componentPath = isDev ? component.path.replace('/dist/', '/src/') : component.path;

      if (!componentExists(componentPath)) {
        return;
      }

      const variableName = getVariableName(id);

      const isPortalsOrWidgets = (
        (type === TYPE_PORTALS && component.target !== 'app.routes')
        || type === TYPE_WIDGETS
      );

      if (isPortalsOrWidgets && has(themePackage.dependencies, 'react-loadable')) {
        imports.push(`const ${variableName} = Loadable({\n  loader: () => import('${componentPath}'),\n  loading: Loading,\n});\n`);
      } else {
        imports.push(`import ${variableName} from '${componentPath}';`);
      }

      if (isArray) {
        exports.push(`  ${variableName},`);
        return;
      }

      exports.push(`  '${id}': ${variableName},`);
    });
  } catch (e) {
    return reject(e);
  }

  if (importsEnd) {
    imports.push(importsEnd);
  }

  exports.push(exportsEnd);

  return resolve({
    imports,
    exports,
  });
});

/**
 * Creates translations for the extension indexing log.
 * @param {string} type The indexed type.
 * @returns {Object}
 */
const getIndexLogTranslations = (type = TYPE_WIDGETS) => {
  const params = { type: t(`TYPE_${type}`) };

  return {
    logStart: `  ${t('INDEXING_TYPE', params)}`,
    logEnd: `  ${t('INDEXED_TYPE', params)}`,
    logNotFound: `  ${t('NO_EXTENSIONS_FOUND_FOR_TYPE', params)}`,
  };
};

/**
 * Validates the extensions input.
 * @param {Object} input The input.
 * @return {Promise}
 */
const validateExtensions = input => new Promise((resolve, reject) => {
  try {
    const extensionPath = getExtensionFolderPath();

    if (!existsSync(extensionPath)) {
      mkdirSync(extensionPath);
    }

    if (!input.imports.length) {
      return resolve(null);
    }

    return resolve(input);
  } catch (e) {
    return reject(new Error(t('EXTENSION_COULD_NOT_BE_VALIDATED')));
  }
});

/**
 * Creates the string that is written into the appropriate file.
 * @param {Object} input The input object.
 * @return {string}
 */
const createStrings = input => new Promise((resolve, reject) => {
  try {
    if (!input) {
      return resolve(null);
    }

    const importsString = input.imports.length ? `${input.imports.join('\n')}\n\n` : '';
    const exportsString = input.exports.length ? `${input.exports.join('\n')}\n` : '';
    const indexString = `${importsString}${exportsString}`.replace('\n\n\n', '\n\n');

    return resolve(indexString.length ? indexString : null);
  } catch (e) {
    return reject(new Error(t('STRINGS_COULD_NOT_BE_CREATED')));
  }
});

/**
 * Writes to extension file.
 * @param {Object} options The action object.
 * @return {Promise}
 */
const writeExtensionFile = options => new Promise((resolve, reject) => {
  try {
    const {
      file,
      input,
      defaultContent,
      logNotFound,
      logEnd,
    } = options;
    const filePath = path.resolve(getExtensionFolderPath(), file);

    if (!input) {
      logger.warn(logNotFound);
      writeFileSync(filePath, defaultContent, { flag: 'w+' });
      return resolve();
    }

    writeFileSync(filePath, input, { flag: 'w+' });
    logger.log(logEnd);
    return resolve();
  } catch (e) {
    return reject(e);
  }
});

/**
 * Creates an index.
 * @param {Object} options The indexing options,
 * @return {Promise}
 */
const index = (options) => {
  const {
    file,
    config,
    logStart,
    logNotFound,
    logEnd,
    defaultContent = defaultFileContent,
  } = options;

  logger.log(logStart);

  return readConfig(config)
    .then(input => validateExtensions(input))
    .then(input => createStrings(input))
    .then(input => writeExtensionFile({
      input,
      file,
      defaultContent,
      logNotFound,
      logEnd,
    }));
};

/**
 * Indexes the widgets.
 * @return {Promise}
 */
const indexWidgets = () => {
  const { widgets = {} } = getComponentsSettings();

  return index({
    file: 'widgets.js',
    config: {
      type: TYPE_WIDGETS,
      config: widgets,
    },
    ...getIndexLogTranslations(TYPE_WIDGETS),
  });
};

/**
 * Indexes the tracking.
 * @return {Promise}
 */
const indexTracking = () => {
  const { tracking = {} } = getComponentsSettings();

  return index({
    file: 'tracking.js',
    config: {
      type: TYPE_TRACKERS,
      config: tracking,
    },
    ...getIndexLogTranslations(TYPE_TRACKERS),
  });
};

/**
 * Indexes the portals.
 * @return {Promise}
 */
const indexPortals = () => {
  const { portals = {} } = getComponentsSettings();

  return index({
    file: 'portals.js',
    config: {
      type: TYPE_PORTALS,
      config: portals,
      importsStart: 'import portalCollection from \'@shopgate/pwa-common/helpers/portals/portalCollection\';',
      exportsStart: 'portalCollection.registerPortals({',
      exportsEnd: '});',
    },
    ...getIndexLogTranslations(TYPE_PORTALS),
  });
};

/**
 * Indexes the reducers from extensions.
 * @return {Promise}
 */
const indexReducers = () => {
  const { reducers = {} } = getComponentsSettings();

  return index({
    file: 'reducers.js',
    config: {
      type: TYPE_REDUCERS,
      config: reducers,
    },
    defaultContent: 'export default null;\n',
    ...getIndexLogTranslations(TYPE_REDUCERS),
  });
};

/**
 * Indexes the RxJS subscriptions from extensions.
 * @return {Promise}
 */
const indexSubscribers = () => {
  const { subscribers = {} } = getComponentsSettings();

  return index({
    file: 'subscribers.js',
    config: {
      type: TYPE_SUBSCRIBERS,
      config: subscribers,
      exportsStart: 'export default [',
      exportsEnd: '];',
      isArray: true,
    },
    defaultContent: 'export default [];\n',
    ...getIndexLogTranslations(TYPE_SUBSCRIBERS),
  });
};

/**
 * Indexes the translations from extensions.
 * @return {Promise}
 */
const indexTranslations = () => {
  const { translations = {} } = getComponentsSettings();

  return index({
    file: 'translations.js',
    config: {
      type: TYPE_TRANSLATIONS,
      config: translations,
    },
    defaultContent: 'export default null;\n',
    ...getIndexLogTranslations(TYPE_TRANSLATIONS),
  });
};

/**
 * Creates the indexes.
 * @return {Promise}
 */
const createIndexes = () => Promise.all([
  indexWidgets(),
  indexTracking(),
  indexPortals(),
  indexReducers(),
  indexSubscribers(),
  indexTranslations(),
]);

export default createIndexes;
