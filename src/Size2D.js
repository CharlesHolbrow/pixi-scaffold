import EventEmitter from 'eventemitter3';

/**
* Size2D stores a two dimensional size, and emits events when the size
* changes.
*
* @extends EventEmitter
*/
export default class Size2D extends EventEmitter {

  /**
  * Create and initialize a Size2D instance
  *
  * @arg {object} size - parameters object
  * @arg {number} size.width - Initial width
  * @arg {number} size.height - Initial height
  */
  constructor(size) {
    super();

    if (typeof size.width !== 'number' || typeof size.height !== 'number')
      throw new Error('Size2D must be constructed with size.width and size.height');

    this._width = size.width;
    this._height = size.height;
  }

  /**
  * Get size width
  * @returns {Number} width
  */
  get width() {
    return this._width;
  }

  /**
  * Get size height
  * @returns {Number} height
  */
  get height() {
    return this._height;
  }

  /**
  * Get width * hight
  * @returns {Number} length
  */
  get length() {
    return this._height * this._width;
  }

  /**
  * Get size height
  * @returns {Number} height
  */
  get center() {
    return {
      x: Math.floor(this.width * 0.5),
      y: Math.floor(this.height * 0.5),
    };
  }

  get centerFloat() {
    return {
      x: this.width,
      y: this.height,
    };
  }

  set width(width) {
    if (width === this._width) return;
    this._width = width;
    this.emit('resize', this);
  }

  set height(height) {
    if (height === this._height) return;
    this._height = height;
    this.emit('resize', this);
  }

  /**
  * Set the width and height simultaneously. Will emit a single 'resize' event
  * iff either width or height has changed.
  *
  * @arg {object} size - new size
  * @arg {number} size.width - new width
  * @arg {number} size.height - new height
  */
  set size(size) {
    if (typeof size.height !== 'number' || typeof size.width !== 'number')
      throw new Error('Cannot set Size2D to non-number values');

    if (size.height === this._height && size.width === this._width) return;
    this._width = size.width;
    this._height = size.height;
    this.emit('resize', this);
  }
}
