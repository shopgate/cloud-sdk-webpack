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
 * Creates the widget index.
 */
const createWidgetsIndex = () => {
  const { widgets } = getComponentsSettings();

  const imports = [];
  const exports = ['export default {'];

  Object.keys(widgets).forEach((widgetId) => {
    const widget = widgets[widgetId];
    const widgetPath = isDev ? widget.path.replace('/dist/', '/src/') : widget.path;

    /**
     * The variable name to be used in import and export statement.
     * @type {string}
     */
    const widgetVariableName = upperFirst(
      camelCase(widgetId.replace(/@/g, '').replace(/\//g, '-'))
    );

    // Add the component to the imports.
    imports.push(`import ${widgetVariableName} from '${widgetPath}';`);
    // Add the component to the exported object.
    exports.push(`  '${widgetId}': ${widgetVariableName},`);
  });

  exports.push('};');

  logger.log('\n  Indexing widgets ...\n');

  const importsString = imports.length ? `${imports.join('\n')}\n\n` : '';
  const indexString = `${importsString}${exports.join('\n')}\n`;
  const widgetsFolder = resolve(themes.getPath(), 'widgets');

  if (!existsSync(widgetsFolder)) {
    mkdirSync(widgetsFolder);
  }

  const indexFile = resolve(themes.getPath(), 'widgets', 'index.js');

  writeFileSync(indexFile, indexString, { flag: 'w+' });
};

export default createWidgetsIndex;
