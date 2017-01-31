/* eslint func-names: "off" */
/* global chai */ // floss automatically imports chai

import Size2D from './Size2D.js';

const expect = chai.expect;

describe('Size2D', () => {
  const s = new Size2D(3, 4);

  it('should exist as a global object', () => {
    expect(s).to.be.an('object');
  });

  it('should have a width 3 and height 4 as per initialization parameters', () => {
    expect(s.width).to.equal(3);
    expect(s.height).to.equal(4);
  });

  it('should emit a "resize" event when we change the size', function (done) {
    this.timeout(1000);
    const targetWidth = 100;
    s.on('resize', () => {
      expect(s.width).to.equal(targetWidth);
      done();
    });
    s.width = targetWidth;
  });
});
