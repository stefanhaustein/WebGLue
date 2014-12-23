var canvas = document.getElementById('canvas');
var gl = canvas.getContext('webgl');
var webglue = window.webglue;
var ctx = new webglue.Context(gl);

var triangle = new webglue.MeshBuilder(ctx, webglue.MeshBuilder.Options.COLOR, 3);
var quad = new webglue.MeshBuilder(ctx, webglue.MeshBuilder.Options.COLOR, 4);

var rtri = 0;
var rquad = 0;

function initGl() {
  gl.clearDepth(1);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  
  triangle.begin(webglue.TRIANGLES);
  triangle.color3f(1.0, 0, 0);
  triangle.vertex3f( 0.0,  1.0, 0.0);                 // Top
  triangle.color3f(0.0, 1.0, 0.0);   
  triangle.vertex3f(-1.0, -1.0, 0.0);                 // Bottom Left
  triangle.color3f(0.0, 0.0, 1.0);   
  triangle.vertex3f( 1.0, -1.0, 0.0);          
  
  quad.begin(webglue.QUADS);                      // Draw A Quad
  quad.color3f(0.0, 0.0, 1.0);   
  quad.vertex3f(-1.0,  1.0, 0.0);                 // Top Left
  quad.vertex3f( 1.0,  1.0, 0.0);                 // Top Right
  quad.vertex3f( 1.0, -1.0, 0.0);                 // Bottom Right
  quad.vertex3f(-1.0, -1.0, 0.0);                 // Bottom Left
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
  ctx.rotatef(rtri, 0.0, 1.0, 0.0);
  
  triangle.end();

  ctx.loadIdentity();                   // Reset The Current Modelview Matrix
  ctx.translatef(1.5, 0.0, -6.0);              // Move Right 1.5 Units And Into The Screen 6.0
  ctx.rotatef(rquad, 1.0, 0.0, 0.0);            // Rotate The Quad On The X axis ( NEW )

  quad.end();
  rtri += 0.2;                     // Increase The Rotation Variable For The Triangle ( NEW )
  rquad -= 0.15;                       // Decrease The Rotation Variable For The Quad     ( NEW )

  return true;
}


function animateGlScene() {
  if (drawGlScene()) {
    window.requestAnimationFrame(animateGlScene);
  }
}


initGl();
resizeGlScene(canvas.width, canvas.height);
animateGlScene();
  