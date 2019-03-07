const assert = require('assert');
const sinon = require('sinon');
const { DEFAULT_LANGUAGE } = require('../../../lib/variables');
const getThemeLanguage = require('../../../lib/helpers/getThemeLanguage');
const logger = require('../../../lib/logger');

describe.skip('getThemeLanguage()', () => {
  before(() => {
    logger.log = sinon.spy();
  });

  afterEach(() => {
    logger.log.restore();
  });

  it('should return the correct language if the desired language is available', () => {
    const available = ['en-US', 'de-DE'];
    const language = 'en-US';
    const result = getThemeLanguage(available, language);
    assert.equal(typeof result, 'string');
    assert.equal(result, 'en-US');
    sinon.assert.calledOnce(logger.log);
  });

  it('should return a language that fits the desired one if no exact match is available', () => {
    const available = ['en-US', 'de-DE'];
    const language = 'de-CH';
    const result = getThemeLanguage(available, language);
    assert.equal(typeof result, 'string');
    assert.equal(result, 'de-DE');
    sinon.assert.calledOnce(logger.log);
  });

  it('should return the fallback language if the desired language is not available', () => {
    const available = ['en-US', 'de-DE'];
    const language = 'es-ES';
    const result = getThemeLanguage(available, language);
    assert.equal(typeof result, 'string');
    assert.equal(result, DEFAULT_LANGUAGE);
    sinon.assert.calledOnce(logger.log);
  });

  it('should return the first language if the desired language and the fallback is not available', () => {
    const available = ['de-DE', 'es-ES'];
    const language = 'en-US';
    const result = getThemeLanguage(available, language);
    assert.equal(typeof result, 'string');
    assert.equal(result, 'de-DE');
    sinon.assert.calledOnce(logger.log);
  });

  it('should return null if no language could be determined at all', () => {
    const available = [];
    const language = 'en-AU';
    const result = getThemeLanguage(available, language);
    assert.equal(result, null);
    sinon.assert.calledOnce(logger.log);
  });
});
