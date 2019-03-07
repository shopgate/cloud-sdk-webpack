const assert = require('assert');

describe.skip('Polyfill', () => {
  before(() => {
    // eslint-disable-next-line no-extend-native
    String.prototype.padEnd = undefined;
    // eslint-disable-next-line global-require
    require('../../../lib/webpackConfig/scripts/polyfill');
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
