// Ensure polyfills are loaded before any of our code
import 'babel-polyfill';

import Size2D from './Size2D.js';
import Tileset from './Tileset.js';
import Chunk from './Chunk.js';

const Aether = {
  Size2D,
  Tileset,
  Chunk,
};

export default Aether;

const t = window.t = new Tileset({
  imgUrl: '/img/elements9x3.png',
  tileWidth: 28,
  tileHeight: 35,
  cellWidth: 30,
  cellHeight: 37,
  width: 9,
  height: 3,
});

window.renderer = null;
window.stage = null;

function updateRendererSize() {
  const width = window.renderer.view.scrollWidth;
  const height = window.renderer.view.scrollHeight;

  if (!window.renderer) return;
  window.renderer.resize(width, height);
  if (!window.stage) return;
  window.stage.x = Math.floor(width / 2);
  window.stage.y = Math.floor(height / 2);
}

function setup() {
  // oryx: 16x24
  // mine: 28x35 (tile), 30x37 (cell)
  for (let i = 0; i < t.length; i++) {
    const s = new PIXI.Sprite(t.textures[i]);

    s.y = Math.floor(i / 9) * t.tileHeight;
    s.x = (i % 9) * t.tileWidth;
    window.stage.addChild(s);
  }
  window.renderer.render(window.stage);
}

window.onload = function() {
  // Create the renderer.
  renderer = PIXI.autoDetectRenderer(512, 512);
  renderer.roundPixels = true;

  // Add the canvas to the HTML document. This will cause the
  // size of the canvas to update as per the canvas css
  // settings. After the canvas has been given the correct size
  // we update the RendererSize
  document.getElementById("main-view").appendChild(renderer.view);
  stage = new PIXI.Container();
  updateRendererSize()

  PIXI.loader
    .add("/img/elements9x3.png")
    .load(setup)
};

window.addEventListener("resize", updateRendererSize);
