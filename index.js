/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Runs the webpackDevServer process.
 * @param {Object} env The environment process config.
 */
module.exports = (env) => {
  process.env = {
    ...process.env,
    ...env,
  };

  setTimeout(() => {
    // eslint-disable-next-line global-require
    require('./dist/webpackDevServer/WebpackDevServer').default.start();
  }, 0);
};
