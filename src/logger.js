/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { green, blue, bold } from 'chalk';

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
    this.prefix = `${green('Shopgate')}${blue('Cloud')}`;

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
    this.logger.log(`  Starting ${bold('Webpack Development Server')} ...\n`);
  }

  /**
   * Logs the build logo.
   */
  logLogoBuild() {
    this.logger.log(`\n${this.getDivider()}`);
    this.logger.log(`  ${green('S H O P G A T E')}   ${blue('C L O U D')}`);
    this.logger.log('  B U I L D\n');
  }

  /**
   * Logs if the build has successfully finished.
   */
  logBuildFinished() {
    this.logger.log(`  ${green('SUCCESS')}: Your project has been built successfully.\n`);
    this.logger.log(this.getDivider());
  }
}

export const logHelper = new LogHelper();
export default console;
