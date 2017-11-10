/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { cyan, green, blue, red, bold } from 'chalk';

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
   * Logs if silent mode is active and logs will be suppressed.
   */
  logSilentMode() {
    // Only log if silent mode is active.
    if (process.env.silent) {
      this.logger.log(bold('  SILENT MODE: logs will be suppressed.\n'));
    }
  }

  /**
   * Logs the server logo.
   */
  logLogo() {
    this.logger.log(`\n${this.getDivider()}`);
    this.logger.log(`  ${green('S H O P G A T E')}   ${blue('C L O U D')}`);
    this.logger.log('  D E V E L O P M E N T   S E R V E R\n');
    this.logger.log(this.getDivider());
    this.logSilentMode();
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

  /**
   * Logs the setup logo.
   */
  logSetupLogo() {
    this.logger.log(`\n${this.getDivider()}`);
    this.logger.log(`  ${green('S H O P G A T E')}   ${blue('C L O U D')}`);
    this.logger.log('  F R O N T E N D   S E T U P\n');
    this.logger.log(this.getDivider());
    this.logger.log('This will guide you through the setup process.');
    this.logger.log('Please answer the following questions:\n');
  }

  /**
   * Logs if a setup process is needed before any action.
   */
  logSetupNeeded() {
    this.logger.log(`\n${this.getDivider()}`);
    this.logger.log(`  ${red(bold('ATTENTION'))}: No frontend configuration could be found!`);
    this.logger.log(`  This is needed to run the ${this.getPrefix()}!\n`);
    this.logger.log(this.getDivider());
    this.logger.log('Please answer the following questions:\n');
  }

  /**
   * Logs the Rapid Dev Server startup information.
   */
  logStartUp() {
    this.logger.log(`  Localhost: ${cyan(`http://localhost:${process.env.apiPort}`)}`);
    this.logger.log(`  LAN:       ${cyan(`http://${process.env.ip}:${process.env.apiPort}`)}\n`);
    this.logger.log(`  Press ${cyan.bold('CTRL-C')} to stop the server!\n`);
    this.logger.log(this.getDivider());
  }
}

export const logHelper = new LogHelper();
export default console;
