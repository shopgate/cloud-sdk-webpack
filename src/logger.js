/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { green, blue, bold } from 'chalk';
import i18n from './i18n';

const t = i18n(__filename);

/**
 * The Logger class hold static functions for logging useful information when running
 * the Rapid Dev Server and the Webpack Dev Server.
 * @type {LogHelper}
 */
class LogHelper {
  /**
   * LogHelper.
   */
  constructor() {
    /**
     * A divider for console outputs.
     * @type {string}
     */
    this.divider = '---------------------------------------------------------------------------\n';
    /**
     * A colored Shopgate Cloud prefix for console outputs.
     * @type {string}
     */
    this.prefix = `${green('Shopgate')}${blue('Connect')}`;

    this.logger = console;
  }

  /**
   * Returns the divider.
   * @return {string}
   */
  getDivider() {
    return this.divider;
  }

  /**
   * Returns the Shopgate Cloud prefix
   * @return {string}
   */
  getPrefix() {
    return this.prefix;
  }

  /**
   * Logs the webpack startup.
   */
  logLogoStart() {
    this.logger.log(`  ${t('BUILD_STARTING', { server: bold(t('SERVER')) })}\n`);
  }

  /**
   * Logs the build logo.
   */
  logLogoBuild() {
    this.logger.log(`\n${this.getDivider()}`);
    this.logger.log(`  ${green('S H O P G A T E')}   ${blue('C O N N E C T')}`);
    this.logger.log('  B U I L D\n');
  }

  /**
   * Logs if the build has successfully finished.
   */
  logBuildFinished() {
    this.logger.log(`  ${t('BUILD_FINISHED', { prefix: green(t('PREFIX')) })}\n`);
    this.logger.log(this.getDivider());
  }
}

export const logHelper = new LogHelper();
export default console;
