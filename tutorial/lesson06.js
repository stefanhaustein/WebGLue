var canvas = document.getElementById('canvas');
var gl = canvas.getContext('webgl');
var webglue = window.webglue;
var ctx = new webglue.Context(gl);

var quad = new webglue.MeshBuilder(ctx, webglue.MeshBuilder.Options.TEXTURE);

var rquad = 0;

function initGl() {
  gl.clearDepth(1);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  
  quad.begin(webglue.QUADS);              // Draw A Quad
  
  quad.loadTexture("nehe.png");
  
  quad.texCoord2f(0.0, 0.0); quad.vertex3f( 1.0, 1.0,-1.0);          // Top Right Of The Quad (Top)
  quad.texCoord2f(1.0, 0.0); quad.vertex3f(-1.0, 1.0,-1.0);          // Top Left Of The Quad (Top)
  quad.texCoord2f(1.0, 1.0); quad.vertex3f(-1.0, 1.0, 1.0);          // Bottom Left Of The Quad (Top)
  quad.texCoord2f(0.0, 1.0); quad.vertex3f( 1.0, 1.0, 1.0);          // Bottom Right Of The Quad (Top)

  quad.texCoord2f(1.0, 0.0); quad.vertex3f( 1.0,-1.0, 1.0);          // Top Right Of The Quad (Bottom)
  quad.texCoord2f(1.0, 1.0); quad.vertex3f(-1.0,-1.0, 1.0);          // Top Left Of The Quad (Bottom)
  quad.texCoord2f(0.0, 1.0); quad.vertex3f(-1.0,-1.0,-1.0);          // Bottom Left Of The Quad (Bottom)
  quad.texCoord2f(0.0, 0.0); quad.vertex3f( 1.0,-1.0,-1.0);          // Bottom Right Of The Quad (Bottom)

  quad.texCoord2f(0.0, 1.0); quad.vertex3f( 1.0, 1.0, 1.0);          // Top Right Of The Quad (Front)
  quad.texCoord2f(0.0, 0.0); quad.vertex3f(-1.0, 1.0, 1.0);          // Top Left Of The Quad (Front)
  quad.texCoord2f(1.0, 0.0); quad.vertex3f(-1.0,-1.0, 1.0);          // Bottom Left Of The Quad (Front)
  quad.texCoord2f(1.0, 1.0); quad.vertex3f( 1.0,-1.0, 1.0);          // Bottom Right Of The Quad (Front)

  quad.texCoord2f(1.0, 1.0); quad.vertex3f( 1.0,-1.0,-1.0);          // Bottom Left Of The Quad (Back)
  quad.texCoord2f(0.0, 1.0); quad.vertex3f(-1.0,-1.0,-1.0);          // Bottom Right Of The Quad (Back)
  quad.texCoord2f(0.0, 0.0); quad.vertex3f(-1.0, 1.0,-1.0);          // Top Right Of The Quad (Back)
  quad.texCoord2f(1.0, 0.0); quad.vertex3f( 1.0, 1.0,-1.0);          // Top Left Of The Quad (Back)

  quad.texCoord2f(1.0, 0.0); quad.vertex3f(-1.0, 1.0, 1.0);          // Top Right Of The Quad (Left)
  quad.texCoord2f(1.0, 1.0); quad.vertex3f(-1.0, 1.0,-1.0);          // Top Left Of The Quad (Left)
  quad.texCoord2f(0.0, 1.0); quad.vertex3f(-1.0,-1.0,-1.0);          // Bottom Left Of The Quad (Left)
  quad.texCoord2f(0.0, 0.0); quad.vertex3f(-1.0,-1.0, 1.0);          // Bottom Right Of The Quad (Left)

  quad.texCoord2f(0.0, 0.0); quad.vertex3f( 1.0, 1.0,-1.0);          // Top Right Of The Quad (Right)
  quad.texCoord2f(1.0, 0.0); quad.vertex3f( 1.0, 1.0, 1.0);          // Top Left Of The Quad (Right)
  quad.texCoord2f(1.0, 1.0); quad.vertex3f( 1.0,-1.0, 1.0);          // Bottom Left Of The Quad (Right)
  quad.texCoord2f(0.0, 1.0); quad.vertex3f( 1.0,-1.0,-1.0);          // Bottom Right Of The Quad (Right)
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

  ctx.loadIdentity();                           // Reset The Current Modelview Matrix
  ctx.translatef(0, 0, -5);              // Move Right And Into The Screen
  ctx.rotatef(rquad, 1.0, 1.0, 1.0);            // Rotate The Cube On X, Y & Z
 
  quad.draw();

  rquad -= 0.15;                  // Decrease The Rotation Variable For The Quad

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
  