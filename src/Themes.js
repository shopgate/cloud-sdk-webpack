/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { existsSync, lstatSync, readdirSync } from 'fs';
import { join, resolve } from 'path';
import inquirer from 'inquirer';
import { isProd } from './environment';

/**
 * The Themes class.
 */
class Themes {
  /**
   * Themes.
   */
  constructor() {
    this.currentTheme = null;
    this.themes = this.findThemes();
  }

  /**
   * Initializes the themes.
   * @param {Function} callback Called when init is done.
   */
  init(callback) {
    if (process.env.theme === 'undefined') {
      this.requestThemeOption(() => {
        this.setCurrentTheme();
        callback();
      });
    } else {
      this.setCurrentTheme();
      callback();
    }
  }

  /**
   * Returns the current theme.
   * @return {Object}
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Returns the current theme path.
   * @return {string}
   */
  getPath() {
    return this.getCurrentTheme().path;
  }

  /**
   * Returns the current theme name.
   * @return {string}
   */
  getName() {
    return this.getCurrentTheme().name;
  }

  /**
   * Returns the current theme's Webpack configuration.
   * @return {Object}
   */
  getConfig() {
    return this.getCurrentTheme().config;
  }

  /**
   * Returns all themes.
   * @return {Array}
   */
  getThemes() {
    return this.themes;
  }

  /**
   * Finds the current theme based on the process environment variables 'theme'.
   * @return {Themes}
   */
  setCurrentTheme() {
    this.currentTheme = this.themes.filter(theme => process.env.theme === theme.name)[0];
    return this;
  }

  /**
   * Inquires a theme selection if not theme was set as an option.
   * @param {Function} callback Called when the inquery is finished.
   */
  requestThemeOption(callback) {
    const themes = this.getThemes().map(theme => theme.name);

    if (themes.length === 1) {
      process.env.theme = themes[0];
      callback();
      return;
    }

    const questions = [
      {
        type: 'list',
        name: 'theme',
        message: 'Please choose a theme to use',
        choices: themes,
      },
    ];

    inquirer.prompt(questions)
      .then((answers) => {
        process.env.theme = answers.theme;
        callback();
      });
  }

  /**
   * Find all themes inside the project.
   * @returns {Array}
   */
  findThemes() {
    // Absolute path to the themes.
    const source = resolve(`${process.cwd()}/themes`);

    // Get all folders inside the themes directory.
    const folders = readdirSync(source)
      .filter(folder => lstatSync(join(source, folder)).isDirectory());

    // Build a nice array of themes and their respective configs.
    return folders.map((name) => {
      // The absolute path to this theme.
      const themePath = join(source, name);

      return {
        name,
        path: themePath,
        config: this.findWebpackConfig(themePath),
      };
    });
  }

  /**
   * Attempt to find a webpack.config.js inside the theme.
   * When a config is not found then a default is used.
   * @param {string} path The path to look for a config.
   * @returns {string} A path to a Webpack config
   */
  findWebpackConfig(path) { // eslint-disable-line class-methods-use-this
    const themeConfig = join(path, 'webpack.config.js');

    if (existsSync(themeConfig)) {
      return themeConfig;
    }

    const configFile = isProd ? 'webpack.prod.js' : 'webpack.dev.js';

    return join(__dirname, `./webpackConfig/${configFile}`);
  }
}

export default new Themes();
