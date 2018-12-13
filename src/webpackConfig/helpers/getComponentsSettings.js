/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { existsSync } from 'fs';
import requireUncached from 'require-uncached';
import { DEFAULT_CONFIG_PATH } from './constants';
import themes from '../../Themes';

/**
 * Returns the app settings from the remote project.
 * @return {Object} The app settings.
 */
const getComponentsSettings = () => {
  try {
    const themePath = themes.getPath();
    const themeWidgets = `${themePath}/widgets`;
    const themeConfig = `${themeWidgets}/widgets.json`;

    const defaultConfig = requireUncached(`${themePath}${DEFAULT_CONFIG_PATH}`);

    const configExists = (existsSync(themeWidgets) && existsSync(themeConfig));
    const config = configExists ? requireUncached(themeConfig) : {};

    return {
      ...defaultConfig,
      widgets: {
        ...defaultConfig.widgets,
        ...config,
      },
    };
  } catch (e) {
    return {};
  }
};

export default getComponentsSettings;
