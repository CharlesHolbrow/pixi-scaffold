import Size2D from './Size2D.js';

/**
* Wraps and renders a map chunk
*/
export default class Chunk {
  /**
  * Wraps and renders a map chunk
  *
  * @arg {Map} map - should contain .chunkWidth and .chunkHeight.
  * @arg {Tileset} tileset - the tileset use
  * @arg {array} data - optional initial array of tiles. For now we assume
  *                     one layer
  */
  constructor(map, tileset) {
    /**
    * How many tiles wide is the chunk
    * @readonly
    */
    this.chunkWidth = map.chunkWidth;

    /**
    * How many tiles tall is the chunk
    * @readonly
    */
    this.chunkHeight = map.chunkHeight;

    /**
    * How many tiles in the chunk. We will need to refactor this
    * when we add additional layers. Should the chunk length
    * indicate how many layers there are?
    * @readonly
    */
    this.length = this.chunkWidth * this.chunkHeight;

    /**
    * The tileset that this uses
    * @readonly
    */
    this.tileset = tileset;

    /**
    * Pixel Dimensions of the chunk
    * @readonly
    */
    this.size = new Size2D({
      width: this.chunkWidth * tileset.tileWidth,
      height: this.chunkHeight * tileset.tileHeight,
    });

    this.container = new PIXI.Container();
  }

  /**
  * Create all the sprites for our chunk
  *
  * @arg {array} data - The contents of our chunk starting at the top left
  */
  createSprites(data) {
    if (!this.tileset.hasLoaded)
      throw new Error('Cannot render chunk: tileset not loaded');

    if (data.length !== this.length)
      throw new Error('Data array wrong size for chunk');

    let cursorX = 0;
    let cursorY = 0;

    for (const i of data) {
      const sprite = this.tileset.createSprite(i);

      sprite.x = cursorX;
      sprite.y = cursorY;
      this.container.addChild(sprite);

      // update our cursors
      cursorX += this.tileset.tileWidth;
      if (cursorX >= this.size.width) {
        cursorX = 0;
        cursorY += this.tileset.tileHeight;
      }
    }
  }
}
