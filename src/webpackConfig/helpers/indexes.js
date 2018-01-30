/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { resolve } from 'path';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import { isDev } from 'Src/environment';
import themes from 'Src/Themes';
import logger from 'Src/logger';
import { EXTENSIONS_PATH } from '../variables';
import getComponentsSettings from './getComponentsSettings';

const EXTENSIONS_FOLDER = 'extensions';

/**
 * Creates an index.
 * @param {Object} config The config to parse.
 * @param {boolean} [attach=false] Whether to attach the output object to the process.env.
 * @return {string} The index.
 */
const createIndex = (config, attach = false) => {
  const imports = attach ? ['import portalCollection from \'@shopgate/pwa-common/helpers/portals/portalCollection\';'] : [];
  const exports = attach ? ['portalCollection.registerPortals({'] : ['export default {'];

  Object.keys(config).forEach((componentId) => {
    const component = config[componentId];
    const componentPath = isDev ? component.path.replace('/dist/', '/src/') : component.path;

    const existsInExtensions = existsSync(resolve(EXTENSIONS_PATH, componentPath));
    const existsInWidgets = existsSync(resolve(themes.getPath(), 'widgets', componentPath));

    if (!existsInExtensions && !existsInWidgets) {
      return;
    }

    /**
     * The variable name to be used in import and export statement.
     * @type {string}
     */
    const componentVariableName = upperFirst(camelCase(componentId
      .replace(/@/g, '').replace(/\//g, '-')));

    // Add the component to the imports.
    imports.push(`import ${componentVariableName} from '${componentPath}';`);
    // Add the component to the exported object.
    exports.push(`  '${componentId}': ${componentVariableName},`);
  });

  exports.push(attach ? '});' : '};');

  const importsString = imports.length ? `${imports.join('\n')}\n\n` : '';
  return `${importsString}${exports.join('\n')}\n`;
};

/**
 * Creates the widgets index.
 */
export const createWidgetsIndex = () => {
  const { widgets } = getComponentsSettings();
  const indexString = createIndex(widgets);
  const extensionsFolder = resolve(themes.getPath(), EXTENSIONS_FOLDER);

  if (!existsSync(extensionsFolder)) {
    mkdirSync(extensionsFolder);
  }

  logger.log('  Indexing widgets ...\n');
  const indexFile = resolve(extensionsFolder, 'widgets.js');

  writeFileSync(indexFile, indexString, { flag: 'w+' });
};

/**
 * Creates the tracking index.
 */
export const createTrackingIndex = () => {
  const { tracking } = getComponentsSettings();
  const indexString = createIndex(tracking);
  const extensionsFolder = resolve(themes.getPath(), EXTENSIONS_FOLDER);

  if (!existsSync(extensionsFolder)) {
    mkdirSync(extensionsFolder);
  }

  logger.log('  Indexing trackers ...\n');
  const indexFile = resolve(extensionsFolder, 'tracking.js');

  writeFileSync(indexFile, indexString, { flag: 'w+' });
};

/**
 * Creates the portals index.
 */
export const createPortalsIndex = () => {
  const { portals } = getComponentsSettings();
  const indexString = createIndex(portals, true, 'PORTALS');
  const extensionsFolder = resolve(themes.getPath(), EXTENSIONS_FOLDER);

  if (!existsSync(extensionsFolder)) {
    mkdirSync(extensionsFolder);
  }

  logger.log('  Indexing portals ...\n');
  const indexFile = resolve(extensionsFolder, 'portals.js');

  writeFileSync(indexFile, indexString, { flag: 'w+' });
};
