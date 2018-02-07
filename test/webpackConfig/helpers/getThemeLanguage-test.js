/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import assert from 'assert';
import { DEFAULT_LANGUAGE } from '../../../src/webpackConfig/variables';
import getThemeLanguage from '../../../src/webpackConfig/helpers/getThemeLanguage';
import sinon from 'sinon';

import { logHelper } from '../../../src/logger';

describe('getThemeLanguage()', () => {
  let loggerSpy = sinon.spy();

  before(() => {
    logHelper.logger = {
      log: loggerSpy
    };
  });

  afterEach(() => {
    loggerSpy.reset();
  })

  it('should return the correct language if the desired language is available', () => {
    const available = ['en-US', 'de-DE'];
    const language = 'en-US';
    const result = getThemeLanguage(available, language);
    assert.equal(typeof result, 'string');
    assert.equal(result, 'en-US');
    sinon.assert.calledOnce(loggerSpy);
  });

  it('should return a language thats fits the desired one if no exact match is available', () => {
    const available = ['en-US', 'de-DE'];
    const language = 'de-CH';
    const result = getThemeLanguage(available, language);
    assert.equal(typeof result, 'string');
    assert.equal(result, 'de-DE');
    sinon.assert.calledOnce(loggerSpy);
  });

  it('should return the fallback language if the desired language is not available', () => {
    const available = ['en-US', 'de-DE'];
    const language = 'es-ES';
    const result = getThemeLanguage(available, language);
    assert.equal(typeof result, 'string');
    assert.equal(result, DEFAULT_LANGUAGE);
    sinon.assert.calledOnce(loggerSpy);
  });

  it('should return the first language if the desired language and the fallback is not available', () => {
    const available = ['de-DE', 'es-ES'];
    const language = 'en-US';
    const result = getThemeLanguage(available, language);
    assert.equal(typeof result, 'string');
    assert.equal(result, 'de-DE');
    sinon.assert.calledOnce(loggerSpy);
  });

  it('should return null if no language could be determined at all', () => {
    const available = [];
    const language = 'en-AU';
    const result = getThemeLanguage(available, language);
    assert.equal(result, null);
    sinon.assert.calledOnce(loggerSpy);
  });
});
