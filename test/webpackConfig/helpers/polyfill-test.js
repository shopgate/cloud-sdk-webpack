/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import assert from 'assert';

describe('convertLanguageToISO', () => {
  before(() => {
    String.prototype.padEnd = undefined // eslint-disable-line no-extend-native
    require('Src/webpackConfig/helpers/polyfill'); // eslint-disable-line global-require
  });

  it('should pad a string correctly', () => {
    const paddedString = 'hello'.padEnd(9, 'world');
    assert.equal(paddedString, 'helloworl');

    const paddedString2 = 'hello'.padEnd(10);
    assert.equal(paddedString2, 'hello     ');

    const paddedString3 = 'hello'.padEnd(3, 'world');
    assert.equal(paddedString3, 'hello');

    const paddedString4 = 'hello'.padEnd(10, 'o');
    assert.equal(paddedString4, 'helloooooo');
  });
});
