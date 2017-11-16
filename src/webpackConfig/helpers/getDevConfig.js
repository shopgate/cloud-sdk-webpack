/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Returns the development configuration.
 * @return {Object} The development configuration.
 */
const getDevConfig = () => {
  const defaultConfig = {
    ip: '127.0.0.0',
    port: 8080,
    apiPort: 9666,
    hmrPort: 3000,
    remotePort: 8000,
    sourceMap: 'cheap-module-eval-source-map',
  };

  try {
    const appSettings = process.env.settings;
    const frontendSettings = appSettings.getFrontendSettings();

    return {
      ...defaultConfig,
      ip: frontendSettings.getIpAddress(),
      port: frontendSettings.getPort(),
      apiPort: frontendSettings.getApiPort(),
      hmrPort: frontendSettings.getHmrPort(),
      remotePort: frontendSettings.getRemotePort(),
      sourceMap: frontendSettings.getSourceMapsType(),
    };
  } catch (e) {
    return defaultConfig;
  }
};

export default getDevConfig;
