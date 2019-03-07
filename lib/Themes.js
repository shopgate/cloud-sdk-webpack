const fs = require('fs');
const path = require('path');

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
    this.setCurrentTheme();
    callback();
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
    const current = this.getCurrentTheme();

    if (!current || !current.name) {
      return process.env.theme;
    }

    return current.name;
  }

  /**
   * Returns the languages of the current theme.
   * @return {Array}
   */
  getLanguages() {
    const current = this.getCurrentTheme();

    if (!current || !current.languages) {
      return [];
    }

    return current.languages;
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
    [this.currentTheme] = this.themes.filter(theme => process.env.theme === theme.name);
    return this;
  }

  /**
   * Find all themes inside the project.
   * @returns {Array}
   */
  findThemes() {
    // Absolute path to the themes.
    const source = path.resolve(`${process.cwd()}/themes`);

    // Get all folders inside the themes directory.
    const folders = fs.readdirSync(source)
      .filter(folder => fs.lstatSync(path.join(source, folder)).isDirectory());

    // Build a nice array of themes and their respective configs.
    return folders.map((name) => {
      // The absolute path to this theme.
      const themePath = path.join(source, name);

      return {
        name,
        path: themePath,
        config: this.findWebpackConfig(themePath),
        languages: this.findLanguages(themePath),
      };
    });
  }

  /**
   * Find all language files of a single theme.
   * @param {string} themePath The path of a theme
   * @return {Array}
   */
  findLanguages(themePath) { // eslint-disable-line class-methods-use-this
    const localeRegex = /^[a-z]{2}-[a-z]{2}.json/i;
    const localeFolder = `${themePath}/locale`;
    let languages = [];

    if (fs.existsSync(localeFolder)) {
      const files = fs.readdirSync(localeFolder);
      // Collect the languages from the folder
      languages = files.reduce((matches, file) => {
        if (localeRegex.test(file)) {
          matches.push(file.substr(0, file.length - 5));
        }

        return matches;
      }, []);
    }

    return languages;
  }

  /**
   * Attempt to find a webpack.config.js inside the theme.
   * When a config is not found then a default is used.
   * @param {string} themePath The path to look for a config.
   * @returns {string} A path to a Webpack config
   */
  findWebpackConfig(themePath) { // eslint-disable-line class-methods-use-this
    const themeConfig = path.join(themePath, 'webpack.config.js');

    if (fs.existsSync(themeConfig)) {
      return themeConfig;
    }

    return path.join(__dirname, 'webpack.config.js');
  }
}

module.exports = new Themes();
