const { join } = require('path');
const assert = require('assert');
const WebPackConfigurator = require('../../lib/webpackConfig/WebpackConfigurator');

const configurator = new WebPackConfigurator();
const configPath = join(__dirname, '../mock/config/webpack.config');

describe.skip('WebPackConfigurator', () => {
  it('should set a config path', () => {
    configurator.setConfigPath(configPath);
    assert.equal(configurator.configPath, configPath);
  });

  it('should load a return a config', () => {
    configurator.loadThemeConfig();
    assert.deepEqual(configurator.getConfig(), {
      isConfig: true,
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
