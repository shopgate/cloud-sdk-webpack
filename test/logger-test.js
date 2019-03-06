const assert = require('assert');
const sinon = require('sinon');
const logger = require('../lib/logger');

describe.skip('LogHelper', () => {
  beforeEach(() => {
    logger.log = sinon.spy();
  });

  afterEach(() => {
    logger.log.restore();
  });

  describe('getDivider()', () => {
    it('should return the divider', () => {
      assert.equal(logger.logHelper.divider, logger.logHelper.getDivider());
    });
  });

  describe('getPrefix()', () => {
    it('should return the prefix', () => {
      assert.equal(logger.logHelper.prefix, logger.logHelper.getPrefix());
    });
  });

  describe('logLogoBuild()', () => {
    it('should call the logger three times', () => {
      logger.logHelper.logLogoBuild();
      sinon.assert.calledThrice(logger.log);
    });
  });

  describe('logBuildFinished()', () => {
    it('should call the logger two times', () => {
      logger.logHelper.logBuildFinished();
      sinon.assert.calledTwice(logger.log);
    });
  });
});
