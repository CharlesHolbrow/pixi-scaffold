import EventEmitter from 'eventemitter3';

/**
* Size2D stores a two dimensional size, and emites events when the size
* changes.
*
* @extends EventEmitter
*/
export default class Size2D extends EventEmitter {

  /**
  * Create and initialize a Size2D instance
  *
  * @arg {number} width - Initial width
  * @arg {number} height - Initial height
  */
  constructor(width, height) {
    super();

    this._width = width;
    this._height = height;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
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
