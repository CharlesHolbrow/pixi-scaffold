/**
* Class Contains all the information about a tileset. Once constructed, all
* properties are read-only.
*/
export default class Tileset {

  /**
  * Create a Tileset
  *
  * @constructor
  * @arg {object} options - configuration parameters
  * @arg {string} options.imgUrl - The image url associated with this tileset
  * @arg {int} options.width - number of tiles per row in the tileset image
  * @arg {int} options.height - number of rows of tiles in the tileset image
  * @arg {int} options.tileWidth - how many pixels wide is a single tile
  * @arg {int} options.tileHeight - how many pixels tall is a single tile
  * @arg {int} options.cellWidth [options.tileWidth] - If there is spacing
    between tiles in the tile image, how many pixels wide is each cell
  * @arg {int} options.cellHeight [options.tileHeight] - If there is spacing
    between tiles in the tile image, how many pixels tall is each cell
  */
  constructor(options) {
    this.imgUrl = options.imgUrl;

    this.width = options.width;
    this.height = options.height;

    this.tileWidth = options.cellWidth;
    this.tileHeight = options.tileHeight;

    this.cellWidth = typeof (options.cellWidth) === 'number'
      ? options.cellWidth
      : options.tileWidth;
    this.cellHeight = typeof (options.cellHeight) === 'number'
      ? options.cellHeight
      : options.tileHeight;

    this.length = this.height * this.width;

    /**
    * Store a PIXI.Rectangle for each tile. Unlike .textures,
    * this is constructed with the Tileset, not when the
    * base teture is loaded.
    *
    * @readonly
    * @member {array}
    */
    this.rectangles = Array(this.length).fill().map((_, i) => {
      return new PIXI.Rectangle(
        this.upperLeftX(i % this.width),
        this.upperLeftY(Math.floor(i / this.width)),
        this.tileWidth,
        this.tileHeight
      );
    });

    /**
    * Store texture for each tile starting at the top left. Will
    * have no contents until base texture is loaded.
    *
    * @readonly
    * @member {array}
    */
    this.textures = Array(this.length).fill();

    /**
    * Set to true once BaseTexture is loaded and the .textures
    * have been initialized. If the BastTexture is loaded when
    * we construct the tileset, .hasLoaded will be true when the
    * constructor returns.
    *
    * @readonly
    * @member {boolean}
    */
    this.hasLoaded = false;

    const onLoad = () => {
      this.textures.forEach((_, i) => {
        this.textures[i] = new PIXI.Texture(this.baseTexture, this.rectangles[i]);
      });
      this.hasLoaded = true;
    };

    /**
    * The PIXI.BaseTexture that is the source for this Tileset
    *
    * @readonly
    * @member {PIXI.BaseTexture}
    */
    this.baseTexture = PIXI.BaseTexture.fromImage(this.imgUrl);
    if (this.baseTexture.hasLoaded) onLoad();
    else this.baseTexture.once('loaded', onLoad);
  }

  upperLeftX(tileX) {
    return (this.cellWidth * tileX) + Math.floor((this.cellWidth - this.tileWidth) / 2);
  }

  upperLeftY(tileY) {
    return (this.cellHeight * tileY) + Math.floor((this.cellHeight - this.tileHeight) / 2);
  }
}

