const fs = require('fs');
const importFresh = require('import-fresh');
const themes = require('../Themes');

/**
 * Returns the app settings from the remote project.
 * @return {Object} The app settings.
 */
module.exports = function getComponentsSettings() {
  try {
    const themePath = themes.getPath();
    const themeWidgets = `${themePath}/widgets`;
    const themeConfig = `${themeWidgets}/widgets.json`;

    const defaultConfig = importFresh(`${themePath}/config/components.json`);

    const configExists = (fs.existsSync(themeWidgets) && fs.existsSync(themeConfig));
    const config = configExists ? importFresh(themeConfig) : {};

    return {
      ...defaultConfig,
      widgets: {
        ...defaultConfig.widgets,
        ...config,
      },
    };
  } catch (e) {
    return {};
  }
};
