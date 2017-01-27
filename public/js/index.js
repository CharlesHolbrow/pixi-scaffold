// Create the renderer
var renderer = PIXI.autoDetectRenderer(256, 256);
// I believe this tells the pixi engine when we resize the dom
// object, but I'm not totally sure.
renderer.autoResize = true;
// Create a container object called the `stage`
var stage = new PIXI.Container();
// Tell the `renderer` to `render` the `stage`
renderer.render(stage);


window.onload = function() {
  //Add the canvas to the HTML document
  document.getElementById("main-view").appendChild(renderer.view);
};

window.addEventListener("resize", function(event){ 
  // example of re-sizing AND re-scaling
  // https://github.com/kittykatattack/scaleToWindow/blob/master/scaleToWindow.js
  // console.log('resize', window.innerWidth, window.innerHeight);
});

