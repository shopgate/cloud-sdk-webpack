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

const TYPE_WIDGETS = 'WIDGETS';
const TYPE_TRACKING = 'TRACKING';
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
    return reject(new TypeError(`The supplied component config is not an object! Received '${typeof config}'`));
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

      if ((type !== TYPE_PORTALS && type !== TYPE_WIDGETS) || !has(themePackage.dependencies, 'react-loadable')) {
        imports.push(`import ${variableName} from '${componentPath}';`);
      } else {
        imports.push(`const ${variableName} = Loadable({\n  loader: () => import('${componentPath}'),\n  loading: Loading,\n});\n`);
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
 * Validates the extensions input.
 * @param {Object} input The inout.
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
    return reject(new Error('Extension could not be validated!'));
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
    return reject(new Error('Strings could not be created!'));
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
    logStart = '  Indexing ...',
    logNotFound = '  No extensions found!',
    logEnd = '  ... widgets indexed.',
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
    logStart: '  Indexing widgets ...',
    logNotFound: '  No extensions found for \'widgets\'',
    logEnd: ' ... widgets indexed.',
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
      type: TYPE_TRACKING,
      config: tracking,
    },
    logStart: '  Indexing trackers ...',
    logNotFound: '  No extensions found for \'tracking\'',
    logEnd: ' ... trackers indexed.',
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
    logStart: '  Indexing portals ...',
    logNotFound: '  No extensions found for \'portals\'',
    logEnd: ' ... portals indexed.',
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
    logStart: '  Indexing reducers ...',
    logNotFound: '  No extensions found for \'reducers\'',
    logEnd: ' ... reducers indexed.',
    defaultContent: 'export default null;\n',
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
    logStart: '  Indexing subscribers ...',
    logNotFound: '  No extensions found for \'subscribers\'',
    logEnd: ' ... subscribers indexed.',
    defaultContent: 'export default [];\n',
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
    logStart: '  Indexing translations ...',
    logNotFound: '  No extensions found for \'translations\'',
    logEnd: ' ... translations indexed.',
    defaultContent: 'export default null;\n',
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
