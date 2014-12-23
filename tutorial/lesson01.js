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
  
  ctx.matrixMode(webglue.PROJECTION);     // Select The Projection Matrix
  ctx.loadIdentity();                     // Reset The Projection Matrix
   
  // Calculate The Aspect Ratio Of The Window
  ctx.perspective(45.0, width / height, 0.1, 100);
  ctx.matrixMode(webglue.MODELVIEW);
}


function drawGlScene() {
  // Calculate a shade of gray in the range of 0..1, depending on the time
  var shade = (Math.sin(Date.now() / 1000) + 1) / 2;
  
  // Clear the gl canvas to the current gray value
  gl.clearColor(shade, shade, shade, 1); 
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  ctx.loadIdentity();  // Reset The Modelview Matrix
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