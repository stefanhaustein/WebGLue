var canvas = document.getElementById('canvas');
var gl = canvas.getContext('webgl');
var webglue = window.webglue;
var ctx = new webglue.Context(gl);

var triangle = new webglue.MeshBuilder(ctx, webglue.MeshBuilder.Options.COLOR, 100);
var quad = new webglue.MeshBuilder(ctx, webglue.MeshBuilder.Options.COLOR, 100);

var rtri = 0;
var rquad = 0;

function initGl() {
  gl.clearDepth(1);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  
  triangle.begin(webglue.TRIANGLES);

  triangle.color3f(1.0,0.0,0.0);          // Red
  triangle.vertex3f( 0.0, 1.0, 0.0);      // Top Of Triangle (Front)
  triangle.color3f(0.0,1.0,0.0);          // Green
  triangle.vertex3f(-1.0,-1.0, 1.0);      // Left Of Triangle (Front)
  triangle.color3f(0.0,0.0,1.0);          // Blue
  triangle.vertex3f( 1.0,-1.0, 1.0);      // Right Of Triangle (Front)

  triangle.color3f(1.0,0.0,0.0);          // Red
  triangle.vertex3f( 0.0, 1.0, 0.0);      // Top Of Triangle (Right)
  triangle.color3f(0.0,0.0,1.0);          // Blue
  triangle.vertex3f( 1.0,-1.0, 1.0);      // Left Of Triangle (Right)
  triangle.color3f(0.0,1.0,0.0);          // Green
  triangle.vertex3f( 1.0,-1.0, -1.0);     // Right Of Triangle (Right)

  triangle.color3f(1.0,0.0,0.0);          // Red
  triangle.vertex3f( 0.0, 1.0, 0.0);      // Top Of Triangle (Back)
  triangle.color3f(0.0,1.0,0.0);          // Green
  triangle.vertex3f( 1.0,-1.0, -1.0);     // Left Of Triangle (Back)
  triangle.color3f(0.0,0.0,1.0);          // Blue
  triangle.vertex3f(-1.0,-1.0, -1.0);     // Right Of Triangle (Back)

  triangle.color3f(1.0,0.0,0.0);          // Red
  triangle.vertex3f( 0.0, 1.0, 0.0);      // Top Of Triangle (Left)
  triangle.color3f(0.0,0.0,1.0);          // Blue
  triangle.vertex3f(-1.0,-1.0,-1.0);      // Left Of Triangle (Left)
  triangle.color3f(0.0,1.0,0.0);          // Green
  triangle.vertex3f(-1.0,-1.0, 1.0);      // Right Of Triangle (Left)

  quad.begin(webglue.QUADS);              // Draw A Quad
  
  quad.color3f(0.0,1.0,0.0);              // Set The Color To Green
  quad.vertex3f( 1.0, 1.0,-1.0);          // Top Right Of The Quad (Top)
  quad.vertex3f(-1.0, 1.0,-1.0);          // Top Left Of The Quad (Top)
  quad.vertex3f(-1.0, 1.0, 1.0);          // Bottom Left Of The Quad (Top)
  quad.vertex3f( 1.0, 1.0, 1.0);          // Bottom Right Of The Quad (Top)

  quad.color3f(1.0,0.5,0.0);              // Set The Color To Orange
  quad.vertex3f( 1.0,-1.0, 1.0);          // Top Right Of The Quad (Bottom)
  quad.vertex3f(-1.0,-1.0, 1.0);          // Top Left Of The Quad (Bottom)
  quad.vertex3f(-1.0,-1.0,-1.0);          // Bottom Left Of The Quad (Bottom)
  quad.vertex3f( 1.0,-1.0,-1.0);          // Bottom Right Of The Quad (Bottom)

  quad.color3f(1.0,0.0,0.0);              // Set The Color To Red
  quad.vertex3f( 1.0, 1.0, 1.0);          // Top Right Of The Quad (Front)
  quad.vertex3f(-1.0, 1.0, 1.0);          // Top Left Of The Quad (Front)
  quad.vertex3f(-1.0,-1.0, 1.0);          // Bottom Left Of The Quad (Front)
  quad.vertex3f( 1.0,-1.0, 1.0);          // Bottom Right Of The Quad (Front)

  quad.color3f(1.0,1.0,0.0);              // Set The Color To Yellow
  quad.vertex3f( 1.0,-1.0,-1.0);          // Bottom Left Of The Quad (Back)
  quad.vertex3f(-1.0,-1.0,-1.0);          // Bottom Right Of The Quad (Back)
  quad.vertex3f(-1.0, 1.0,-1.0);          // Top Right Of The Quad (Back)
  quad.vertex3f( 1.0, 1.0,-1.0);          // Top Left Of The Quad (Back)

  quad.color3f(0.0,0.0,1.0);              // Set The Color To Blue
  quad.vertex3f(-1.0, 1.0, 1.0);          // Top Right Of The Quad (Left)
  quad.vertex3f(-1.0, 1.0,-1.0);          // Top Left Of The Quad (Left)
  quad.vertex3f(-1.0,-1.0,-1.0);          // Bottom Left Of The Quad (Left)
  quad.vertex3f(-1.0,-1.0, 1.0);          // Bottom Right Of The Quad (Left)

  quad.color3f(1.0,0.0,1.0);              // Set The Color To Violet
  quad.vertex3f( 1.0, 1.0,-1.0);          // Top Right Of The Quad (Right)
  quad.vertex3f( 1.0, 1.0, 1.0);          // Top Left Of The Quad (Right)
  quad.vertex3f( 1.0,-1.0, 1.0);          // Bottom Left Of The Quad (Right)
  quad.vertex3f( 1.0,-1.0,-1.0);          // Bottom Right Of The Quad (Right)
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
  
  triangle.draw();

  ctx.loadIdentity();                           // Reset The Current Modelview Matrix
  ctx.translatef(1.5, 0.0, -7.0);               // Move Right And Into The Screen
  ctx.rotatef(rquad, 1.0, 1.0, 1.0);            // Rotate The Cube On X, Y & Z
 
  quad.draw();

  rtri += 0.2;                    // Increase The Rotation Variable For The Triangle
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
  