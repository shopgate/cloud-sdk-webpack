/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import StringReplacePlugin from 'string-replace-webpack-plugin';
import themes from 'Src/Themes';
import { EXTENSIONS_PATH } from '../variables';

const stringReplacementLoader = StringReplacePlugin.replace({
  replacements: [
    {
      pattern: /__THEME_PATH__/g,
      replacement: () => JSON.stringify(themes.getPath()),
    },
    {
      pattern: /__EXTENSIONS_PATH__/g,
      replacement: () => JSON.stringify(EXTENSIONS_PATH),
    },
  ],
});

export default stringReplacementLoader;
