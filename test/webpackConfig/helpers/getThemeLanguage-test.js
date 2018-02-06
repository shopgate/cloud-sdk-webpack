/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

process.env.SDK_PATH = '';

import assert from 'assert';
import { DEFAULT_LANGUAGE } from '../../../src/webpackConfig/variables';
import getThemeLanguage from '../../../src/webpackConfig/helpers/getThemeLanguage';

describe('getThemeLanguage()', () => {
  it('should return the correct language if the requested language is available', () => {
    const available = ['en-US', 'de-DE'];
    const language = 'en-US';
    const result = getThemeLanguage(available, language);
    assert.equal(typeof result, 'string');
    assert.equal(result, 'en-US');
  });

  it('should return the fallback language if the requested language is not available', () => {
    const available = ['en-US', 'de-DE'];
    const language = 'en-AU';
    const result = getThemeLanguage(available, language);
    assert.equal(typeof result, 'string');
    assert.equal(result, DEFAULT_LANGUAGE);
  });

  it('should return the first language if the requested language and the fallback is not available', () => {
    const available = ['de-DE', 'en-GB'];
    const language = 'en-US';
    const result = getThemeLanguage(available, language);
    assert.equal(typeof result, 'string');
    assert.equal(result, 'de-DE');
  });

  it('should return null if no language could be determined at all', () => {
    const available = [];
    const language = 'en-AU';
    const result = getThemeLanguage(available, language);
    assert.equal(result, null);
  });
});
