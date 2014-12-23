var canvas = document.getElementById('canvas');
var gl = canvas.getContext('webgl');
var webglue = window.webglue;
var ctx = new webglue.Context(gl);
  

function initGl() {
  gl.clearDepth(1);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
}


function resizeGlScene(width, height) {
  gl.viewport(0, 0, width, height);
  
  ctx.matrixMode(webglue.PROJECTION);           // Select The Projection Matrix
  ctx.loadIdentity();                           // Reset The Projection Matrix
  
  // Calculate The Aspect Ratio Of The Window
  ctx.perspective(45.0, canvas.width / canvas.height, 0.1, 100);
  ctx.matrixMode(webglue.MODELVIEW);            // Select The Modelview Matrix
}


function drawGlScene() {
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  ctx.loadIdentity();                           // Reset The Modelview Matrix
  ctx.translatef(-1.5, 0.0, -6.0);   

  var mb = new webglue.MeshBuilder(ctx, webglue.MeshBuilder.Options.COLOR, 10);
  mb.begin(webglue.TRIANGLES);                 // Drawing Using Triangles
  mb.color3f(1.0, 0, 0);
  mb.vertex3f( 0.0,  1.0, 0.0);                 // Top
  mb.color3f(0.0, 1.0, 0.0);   
  mb.vertex3f(-1.0, -1.0, 0.0);                 // Bottom Left
  mb.color3f(0.0, 0.0, 1.0);   
  mb.vertex3f( 1.0, -1.0, 0.0);                 // Bottom Right
  mb.draw();     

  ctx.translatef(3.0, 0.0,0.0);

  mb.begin(webglue.QUADS);                      // Draw A Quad
  mb.color3f(0.0, 0.0, 1.0);   
  mb.vertex3f(-1.0,  1.0, 0.0);                 // Top Left
  mb.vertex3f( 1.0,  1.0, 0.0);                 // Top Right
  mb.vertex3f( 1.0, -1.0, 0.0);                 // Bottom Right
  mb.vertex3f(-1.0, -1.0, 0.0);                 // Bottom Left
  mb.draw();                                     // Done Drawing The Quad
  return false;  // No animation
}


function animateGlScene() {
  if (drawGlScene()) {
    window.requestAnimationFrame(animateGlScene);
  }
}


initGl();
resizeGlScene(canvas.width, canvas.height);
animateGlScene();
  