/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import assert from 'assert';
import sinon from 'sinon';
import { join } from 'path';

const sandbox = sinon.sandbox.create();

const projectDirectory = join(process.cwd(), 'test/mock');
process.env.theme = 'theme1';

const cwd = process.cwd();
process.chdir(projectDirectory);

const themes = require('Src/Themes').default;

/**
 * Sets the theme environment variable
 * @param {string} theme The updated theme name
 * @return {string} The previous value of the variable
 */
const setThemeProcessEnv = (theme) => {
  const prev = process.env.theme;
  process.env.theme = theme;
  return prev;
};

const logger = {
  plain: sandbox.spy(),
};

describe('Themes', () => {
  let mockThemes;
  let setCurrentThemeSpy;

  before(() => {
    setCurrentThemeSpy = sandbox.spy(themes, 'setCurrentTheme');

    mockThemes = [
      {
        name: 'theme1',
        path: join(projectDirectory, './themes/theme1'),
        config: join(projectDirectory, './themes/theme1/webpack.config.js'),
        languages: ['de-DE', 'en-US'],
      },
      {
        name: 'theme2',
        path: join(projectDirectory, './themes/theme2'),
        config: join(projectDirectory, '../../src/webpackConfig/webpack.dev.js'),
        languages: [],
      },
    ];
  });

  after(() => {
    sandbox.restore();
  });

  beforeEach(() => {
    // Set the current theme to the first available one
    setThemeProcessEnv(mockThemes[0].name);
    themes.setCurrentTheme();
    // Take care that the spy is reset
    sandbox.reset();
  });

  afterEach(() => {
    logger.plain.reset();
  });

  describe('.getThemes', () => {
    it('should return all themes', () => {
      const allThemes = themes.getThemes();
      assert.deepEqual(allThemes, mockThemes);
    });
  });

  describe('.setCurrentTheme()', () => {
    it('should set the current theme to the 1st one', () => {
      setThemeProcessEnv(mockThemes[0].name);
      themes.setCurrentTheme();

      assert.equal(themes.currentTheme.name, mockThemes[0].name);
      sinon.assert.calledOnce(setCurrentThemeSpy);
    });

    it('should set the current theme to the 2nd one', () => {
      setThemeProcessEnv(mockThemes[1].name);
      themes.setCurrentTheme();
      assert.equal(themes.currentTheme.name, mockThemes[1].name);
      sinon.assert.calledOnce(setCurrentThemeSpy);
    });
  });

  describe('.getCurrentTheme', () => {
    it('should get the current theme', () => {
      const currentTheme = themes.getCurrentTheme();
      assert.equal(currentTheme.name, mockThemes[0].name);
    });
  });

  describe('.getLanguages()', () => {
    it('should return languages if the theme contains some', () => {
      const result = themes.getLanguages();
      assert.deepStrictEqual(result, mockThemes[0].languages);
    });

    it('should return an empty array if the theme does not have languages', () => {
      [, themes.currentTheme] = mockThemes;
      const result = themes.getLanguages();
      assert.deepStrictEqual(result, []);
    });

    it('should return an empty array if no proper theme is set', () => {
      const oldState = themes.currentTheme;
      themes.currentTheme = null;
      const result = themes.getLanguages();
      assert.deepStrictEqual(result, []);
      // Reset the state of the theme
      themes.currentTheme = oldState;
    });

    it('should return an empty array if language property of the theme does not exist', () => {
      themes.currentTheme.languages = null;
      const result = themes.getLanguages();
      assert.deepStrictEqual(result, []);
    });
  });

  describe('.findLanguages()', () => {
    it('should return an array with languages when a theme has languages', () => {
      const themeFolder = join(projectDirectory, './themes/theme1');
      const expected = ['de-DE', 'en-US'];
      const result = themes.findLanguages(themeFolder);
      assert.deepEqual(result, expected);
    });

    it('should return an empty array if the theme has no languages', () => {
      const themeFolder = join(projectDirectory, './themes/theme2');
      const expected = [];
      const result = themes.findLanguages(themeFolder);
      assert.deepEqual(result, expected);
    });
  });
});

process.chdir(cwd);
