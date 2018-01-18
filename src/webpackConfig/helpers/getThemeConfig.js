/**
 * Copyright (c) 2018, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Color from 'color';
import requireUncached from 'require-uncached';
import themes from '../../Themes';
import getAppSettings from './getAppSettings';

/**
 * Calculates a contrast color for a given background color.
 * The color will either be black or white depending on the perceived
 * luminosity of the background color.
 * @param {string} bgColor The background color.
 * @param {Object} colors The full color variables.
 * @returns {string} The contrast color.
 */
const getContrastColor = (bgColor, colors) => {
  // We set a rather high cutoff to prefer light text if possible.
  const cutoff = 0.74;

  // Calculate the perceived luminosity (relative brightness) of the color.
  const perceivedLuminosity = Color(bgColor).luminosity();

  return perceivedLuminosity >= cutoff ? colors.dark : colors.light;
};

/**
 * Gets the default focus color. This usually is the themes primary color.
 * However, if this color is too bright, the result of ths method
 * will fall back to the accent color.
 * @param {Object} colors The full color variables.
 * @return {string} The color.
 */
const getFocusColor = (colors) => {
  if (Color(colors.primary).luminosity() >= 0.8) {
    return colors.accent;
  }
  return colors.primary;
};

/**
 * Applies the constrast and focus colors to the colors configuration.
 * @param {Object} config The complete theme configuration.
 * @return {Object}
 */
const applyContrastColors = (config) => {
  const { colors } = config;

  return {
    ...config,
    colors: {
      ...colors,
      primaryContrast: getContrastColor(colors.primary, colors),
      accentContrast: getContrastColor(colors.accent, colors),
      focus: getFocusColor(colors),
    },
  };
};

/**
 * Applies custom colors
 * @param {[type]} config [description]
 * @return {[type]} [description]
 */
const applyCustomColors = (config) => {
  const { colors } = getAppSettings();

  if (!config.hasOwnProperty('colors')) {
    return {
      ...config,
      colors,
    };
  }

  return {
    ...config,
    colors: {
      ...config.colors,
      ...colors,
    },
  };
};

/**
 * Returns the app settings from the remote project.
 * @return {Object} The app settings.
 */
const getThemeConfig = () => {
  try {
    const rawConfig = requireUncached(`${themes.getPath()}/theme-config`);
    const config = applyCustomColors(rawConfig);
    return applyContrastColors(config);
  } catch (e) {
    return {};
  }
};

export default getThemeConfig;
