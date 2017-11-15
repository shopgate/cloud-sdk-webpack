/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { join } from 'path';
import assert from 'assert';
import sinon from 'sinon';
import WebPackConfigurator from 'Src/webpackConfig/WebpackConfigurator';

const configurator = new WebPackConfigurator();
const configPath = join(__dirname, '../mock/config/webpack.config');

describe('WebPackConfigurator', () => {
  it('should set a config path', () => {
    configurator.setConfigPath(configPath);
    assert.equal(configurator.configPath, configPath);
  });

  it('should load a return a config', () => {
    configurator.loadThemeConfig();
    assert.deepEqual(configurator.getConfig(), {
      default: {
        isConfig: true,
      },
    });
  });

  it('should error when a config cannot be loaded', () => {
    configurator.setConfigPath('some/path');
    assert.throws(configurator.loadThemeConfig, Error);
  });

  it('should return a server config', () => {
    assert.deepEqual(configurator.defaultServerConfig, configurator.getServerConfig());
  });
});
