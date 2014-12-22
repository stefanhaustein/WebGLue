var canvas = document.getElementById('canvas');
var gl = canvas.getContext('webgl');

gl.clearColor(0, 0, 0, 1); 

gl.clearDepth(1);          
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LEQUAL);

gl.viewport(0, 0, canvas.width, canvas.height);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);