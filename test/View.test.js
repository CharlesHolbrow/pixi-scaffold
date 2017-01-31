/* eslint func-names: "off" */
/* global chai */ // floss automatically imports chai

import View from './View.js';

const expect = chai.expect;

describe('View', function () {
  it('Should exist', function () {
    expect(View).to.be.an('function');
  });
});
