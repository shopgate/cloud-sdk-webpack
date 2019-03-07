const importFresh = require('import-fresh');
const themes = require('../Themes');

/**
 * Returns the app settings from the remote project.
 * @return {Object} The app settings.
 */
module.exports = function getAppSettings() {
  try {
    return importFresh(`${themes.getPath()}/config/app.json`);
  } catch (e) {
    return {};
  }
};
