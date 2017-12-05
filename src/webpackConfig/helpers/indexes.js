/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import { isDev } from 'Src/environment';
import themes from 'Src/Themes';
import { resolve } from 'path';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import logger from 'Src/logger';
import getComponentsSettings from './getComponentsSettings';

/**
 * Creates an index.
 * @param {Object} config The config to parse.
 * @return {string} The index.
 */
const createIndex = (config) => {
  const imports = [];
  const exports = ['export default {'];

  Object.keys(config).forEach((componentId) => {
    const component = config[componentId];
    const componentPath = isDev ? component.path.replace('/dist/', '/src/') : component.path;

    if (!existsSync(resolve(process.env.PWD, 'extensions', componentPath))) {
      return;
    }

    /**
     * The variable name to be used in import and export statement.
     * @type {string}
     */
    const componentVariableName = upperFirst(
      camelCase(componentId.replace(/@/g, '').replace(/\//g, '-'))
    );

    // Add the component to the imports.
    imports.push(`import ${componentVariableName} from '${componentPath}';`);
    // Add the component to the exported object.
    exports.push(`  '${componentId}': ${componentVariableName},`);
  });

  exports.push('};');

  const importsString = imports.length ? `${imports.join('\n')}\n\n` : '';
  return `${importsString}${exports.join('\n')}\n`;
};

/**
 * Creates the widgets index.
 */
export const createWidgetsIndex = () => {
  const { widgets } = getComponentsSettings();
  const indexString = createIndex(widgets);
  const extensionsFolder = resolve(themes.getPath(), 'extensions');

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
  const extensionsFolder = resolve(themes.getPath(), 'extensions');

  if (!existsSync(extensionsFolder)) {
    mkdirSync(extensionsFolder);
  }

  logger.log('  Indexing trackers ...\n');
  const indexFile = resolve(extensionsFolder, 'tracking.js');

  writeFileSync(indexFile, indexString, { flag: 'w+' });
};
