const fs = require('fs');
const path = require('path');

/**
 * Returns the node_modules path.
 * @param {boolean} isDev Whether in local development mode.
 * @return {string}
 */
module.exports = function getNodeModulesPath(isDev = false) {
  const envSdkPath = (process.env.SDK_PATH || '');
  const sdkPath = path.resolve(envSdkPath, 'node_modules');

  if (!isDev) {
    return sdkPath;
  }

  const localPath = path.resolve(__dirname, '..', '..', 'node_modules');
  if (!fs.existsSync(path.resolve(localPath, 'babel-loader'))) {
    return sdkPath;
  }

  return localPath;
};
