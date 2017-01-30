// Ensure polyfills are loaded before any of our code
import 'babel-polyfill';

import Tileset from './Tileset.js';

window.t = new Tileset({
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


function updateRendererSize(){
  var width = renderer.view.scrollWidth;
  var height = renderer.view.scrollHeight;
  if (!renderer) return;
  renderer.resize(width, height);
}

function setup() {
  // oryx: 16x24
  // mine: 28x35 (tile), 30x37 (cell)
  const texture = PIXI.loader.resources["/img/elements9x3.png"].texture;
  const terrain = PIXI.Sprite.fromImage("/img/elements9x3.png");
  texture.frame = new PIXI.Rectangle(30, 37, 30, 37);

  stage.addChild(terrain);
  renderer.render(stage);
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
  updateRendererSize()

  stage = new PIXI.Container();

  PIXI.loader
    .add("/img/elements9x3.png")
    .load(setup)
};

window.addEventListener("resize", updateRendererSize);
