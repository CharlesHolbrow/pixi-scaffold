export default class Tileset {
  constructor(options) {
    this.imgUrl = options.imgUrl;

    this.width = options.width;
    this.height = options.height;

    this.tileWidth = options.cellWidth;
    this.tileHeight = options.tileHeight;

    this.cellWidth = typeof(options.cellWidth) === "number" ?
      options.cellWidth : option.tileWidth;
    this.cellHeight = typeof(options.cellHeight) === "number" ?
      options.cellHeight : option.tileHeight;

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
    this.textures = Array(this.length).fill()

    /**
    * Set to true once BaseTexture is loaded and the .textures
    * have been initialized. If the BastTexture is loaded when
    * we construct the tileset, .hasLoaded will be true
    * immediately.
    *
    * @readonly
    * @member {boolean}
    */
    this.hasLoaded = false;

    const onLoad = ()=> {
      this.textures.forEach((_, i) => {
        this.textures[i] = new PIXI.Texture(this.baseTexture, this.rectangles[i]);
      });
      this.hasLoaded = true;
    }

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

