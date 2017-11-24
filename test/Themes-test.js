/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import assert from 'assert';
import sinon from 'sinon';
import { join } from 'path';

const projectDirectory = join(process.cwd(), 'test/mock');
process.env.theme = 'theme1';
process.cwd = () => projectDirectory;

const themes = require('Src/Themes').default;

const logger = {
  plain: sinon.spy(),
};

const mockThemes = [
  {
    name: 'theme1',
    path: join(projectDirectory, './themes/theme1'),
    config: join(projectDirectory, './themes/theme1/webpack.config.js'),
  },
  {
    name: 'theme2',
    path: join(projectDirectory, './themes/theme2'),
    config: join(projectDirectory, '../../src/webpackConfig/webpack.dev.js'),
  },
];

describe('Themes', () => {
  afterEach(() => {
    logger.plain.reset();
  });

  it('should return all themes', () => {
    const allThemes = themes.getThemes();
    assert.deepEqual(allThemes, mockThemes);
  });

  it('should set the current theme', () => {
    const spy = sinon.spy(themes, 'setCurrentTheme');
    themes.setCurrentTheme('theme1');
    sinon.assert.calledOnce(spy);
  });

  it('should get the current theme', () => {
    const currentTheme = themes.getCurrentTheme();
    assert.equal(mockThemes[0].name, currentTheme.name);
  });
});
