/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const ENV_KEY_DEVELOPMENT = 'development';
export const ENV_KEY_STAGING = 'staging';
export const ENV_KEY_PRODUCTION = 'production';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = ENV_KEY_DEVELOPMENT;
}

export const ENV = process.env.NODE_ENV;
export const isProd = (process.env.NODE_ENV === ENV_KEY_PRODUCTION);
export const isStaging = (process.env.NODE_ENV === ENV_KEY_STAGING);
export const isDev = (process.env.NODE_ENV === ENV_KEY_DEVELOPMENT);

if (isStaging) {
  process.env.BABEL_ENV = ENV_KEY_PRODUCTION;
}
