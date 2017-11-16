/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import requireUncached from 'require-uncached';
import themes from '../../Themes';

/**
 * Returns the app settings from the remote project.
 * @return {Object} The app settings.
 */
const getAppSettings = () => {
  try {
    return requireUncached(`${themes.getPath()}/config/app.json`);
  } catch (e) {
    return {};
  }
};

export default getAppSettings;
