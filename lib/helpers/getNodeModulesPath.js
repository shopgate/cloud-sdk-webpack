const fs = require('fs');
const path = require('path');
const { isDev } = require('../variables');

/**
 * Returns the node_modules path.
 * @return {string}
 */
module.exports = function getNodeModulesPath() {
  const envSdkPath = (process.env.SDK_PATH || '');
  const sdkPath = path.resolve(envSdkPath, 'node_modules');
  const localPath = path.resolve(__dirname, '..', '..', '..', 'node_modules');

  if (!isDev) {
    return sdkPath;
  }

  if (!fs.existsSync(path.resolve(localPath, 'babel-loader'))) {
    return sdkPath;
  }

  return localPath;
};
