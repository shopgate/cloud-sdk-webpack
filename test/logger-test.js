/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import assert from 'assert';
import sinon from 'sinon';
import { logHelper } from '../src/logger';

const logger = {
  log: sinon.spy(),
};

describe('LogHelper', () => {
  afterEach(() => {
    logger.log.reset();
    logHelper.logger = logger;
  });

  describe('getDivider()', () => {
    it('should return the divider', () => {
      assert.equal(logHelper.divider, logHelper.getDivider());
    });
  });

  describe('getPrefix()', () => {
    it('should return the prefix', () => {
      assert.equal(logHelper.prefix, logHelper.getPrefix());
    });
  });

  describe('logLogoBuild()', () => {
    it('should call the logger three times', () => {
      logHelper.logLogoBuild();
      sinon.assert.calledThrice(logger.log);
    });
  });

  describe('logBuildFinished()', () => {
    it('should call the logger two times', () => {
      logHelper.logBuildFinished();
      sinon.assert.calledTwice(logger.log);
    });
  });
});
