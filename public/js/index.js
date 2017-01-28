//Aliases
var Container = PIXI.Container,
    loader    = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite    = PIXI.Sprite,
    Rectangle = PIXI.Rectangle;

var renderer
  , stage;


function updateRendererSize(){
  var width = renderer.view.scrollWidth;
  var height = renderer.view.scrollHeight;
  if (!renderer) return;
  renderer.resize(width, height);
}

function setup() {

  // oryx: 16x24
  // mine: 28x35 (tile), 30x37 (cell)
  var texture = loader.resources["/img/elements9x3.png"].texture;
  texture.frame = new Rectangle(30, 37, 30, 37);
  var terrain = new PIXI.extras.TilingSprite(texture);

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

  loader
    .add("/img/elements9x3.png")
    .load(setup)
};

window.addEventListener("resize", updateRendererSize);
