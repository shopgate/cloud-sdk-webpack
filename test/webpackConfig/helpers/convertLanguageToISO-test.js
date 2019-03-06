const assert = require('assert');
const convertLanguageToISO = require('../../../lib/helpers/convertLanguageToISO');

describe.skip('convertLanguageToISO', () => {
  it('should return a transformed language code', () => {
    const lang = convertLanguageToISO('en-us');
    assert.equal(lang, 'en-US');
  });

  it('should return an untransformed code when code is invalid', () => {
    const lang = convertLanguageToISO('wrong');
    assert.equal(lang, 'wrong');
  });
});
