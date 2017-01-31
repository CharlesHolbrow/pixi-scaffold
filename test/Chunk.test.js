/* eslint func-names: "off" */
/* eslint no-unused-expressions: "off" */
/* global chai, require */ // floss automatically imports chai
import 'babel-polyfill';

// Im' nos sure why, but I have to require('pixi.js')
// es6 style import does not work correctly
const PIXI = require('pixi.js');

import Tileset from './Tileset.js';
import Chunk from './Chunk.js';

const expect = chai.expect;

// Create a stub canvas
const canvas = document.createElement('canvas');

canvas.width = 40;
canvas.height = 40;

const baseTexture = new PIXI.BaseTexture.fromCanvas(canvas);
const tsOptions = {
  baseTexture,
  tileWidth: 10,
  tileHeight: 8,
  width: 4,
  height: 5,
};

describe('Tileset', function () {
  const ts = new Tileset(tsOptions);

  it('Should exist', function () {
    expect(Tileset).to.exist;
  });

  it('.hasLoaded should be true instantly when we supply a canvas', function () {
    expect(ts.hasLoaded).to.be.true;
  });

  it('.initialized tileHeight and tileWidth', function () {
    expect(ts.tileHeight).to.equal(tsOptions.tileHeight);
    expect(ts.tileWidth).to.equal(tsOptions.tileWidth);
  });

  it('.cellHeight and .cellWidth should default to to .tileHeight and .tileWidth', function () {
    expect(ts.cellHeight).to.equal(ts.tileHeight);
    expect(ts.cellWidth).to.equal(ts.tileWidth);
  });

  it('should have a .length equal to the width * height', function () {
    expect(ts.length).to.equal(tsOptions.width * tsOptions.height);
  });
});

describe('Chunk', function () {
  it('Should exist', function () {
    expect(Chunk).to.exist;
  });

  const ts = new Tileset(tsOptions);
  const map = {
    chunkWidth: 3,
    chunkHeight: 2,
  };
  const chunk = new Chunk(map, ts);

  it('should have size equal to the pixel size', function () {
    expect(chunk.size.width).to.equal(map.chunkWidth * ts.tileWidth);
    expect(chunk.size.height).to.equal(map.chunkHeight * ts.tileHeight);
    expect(chunk.length).to.equal(map.chunkWidth * map.chunkHeight);
  });

  it('should initialize with .createSprites(array)', function () {
    const data = new Array(chunk.length).fill().map((_, i) => {
      return i % ts.length;
    });

    chunk.createSprites(data);
  });
});
