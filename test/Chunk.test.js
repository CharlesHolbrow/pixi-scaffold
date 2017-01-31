/* eslint func-names: "off" */
/* global chai */ // floss automatically imports chai

import Chunk from './Chunk.js';

const expect = chai.expect;

describe('Chunk', function () {
  it('Should exist', function () {
    expect(Chunk).to.be.an('function');
  });
});
