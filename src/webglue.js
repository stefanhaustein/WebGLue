// Copyright (c) 2014 Stefan Haustein; 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var webglue = window.webglue = {};
   
webglue.MODELVIEW = 0x1700;
webglue.PROJECTION = 0x1701;
webglue.TEXTURE = 0x1702;

webglue.POINTS = 0x0000;
webglue.LINES = 0x0001;
webglue.LINE_LOOP = 0x0002;
webglue.LINE_STRIP = 0x0003;
webglue.TRIANGLES = 0x0004;
webglue.TRIANGLE_STRIP = 0x0005;
webglue.TRIANGLE_FAN =  0x0006;
webglue.QUADS = 0x0007;

webglue.IDENTITY_MATRIX = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];

/**
 * Computes the length of a vector
 * 
 * @param {number} x x coordinate of a vector
 * @param {number} y y coordinate of a vector
 * @param {number} z z coordinate of a vector
 * @return {number} the length of a vector
 */
webglue.length = function (x, y, z) {
  return Math.sqrt(x * x + y * y + z * z);
};

webglue.tmpMatrix_ = new Float32Array(16);


webglue.multiplyMM = function (ab, abOfs, a, aOfs, b, bOfs) {
  var a0 = a[aOfs + 0], a1 = a[aOfs + 1], a2 = a[aOfs + 2], a3 = a[aOfs + 3];
  var a4 = a[aOfs + 4], a5 = a[aOfs + 5], a6 = a[aOfs + 6], a7 = a[aOfs + 7];
  var a8 = a[aOfs + 8], a9 = a[aOfs + 9], a10 = a[aOfs + 10], a11 = a[aOfs + 11];
  var a12 = a[aOfs + 12], a13 = a[aOfs + 13], a14 = a[aOfs + 14], a15 = a[aOfs + 15];

  var b0 = b[bOfs + 0], b1 = b[bOfs + 1], b2 = b[bOfs + 2], b3 = b[bOfs + 3];
  var b4 = b[bOfs + 4], b5 = b[bOfs + 5], b6 = b[bOfs + 6], b7 = b[bOfs + 7];
  var b8 = b[bOfs + 8], b9 = b[bOfs + 9], b10 = b[bOfs + 10], b11 = b[bOfs + 11];
  var b12 = b[bOfs + 12], b13 = b[bOfs + 13], b14 = b[bOfs + 14], b15 = b[bOfs + 15];

  ab[abOfs + 0] = (b0 * a0) + (b1 * a4) + (b2 * a8) + (b3 * a12);
  ab[abOfs + 1] = (b0 * a1) + (b1 * a5) + (b2 * a9) + (b3 * a13);
  ab[abOfs + 2] = (b0 * a2) + (b1 * a6) + (b2 * a10) + (b3 * a14) ;
  ab[abOfs + 3] = (b0 * a3) + (b1 * a7) + (b2 * a11) + (b3 * a15) ;
  ab[abOfs + 4] = (b4 * a0) + (b5 * a4) + (b6 * a8) + (b7 * a12);
  ab[abOfs + 5] = (b4 * a1) + (b5 * a5) + (b6 * a9) + (b7 * a13);
  ab[abOfs + 6] = (b4 * a2) + (b5 * a6) + (b6 * a10) + (b7 * a14) ;
  ab[abOfs + 7] = (b4 * a3) + (b5 * a7) + (b6 * a11) + (b7 * a15) ;
  ab[abOfs + 8] = (b8 * a0) + (b9 * a4) + (b10 * a8) + (b11 * a12);
  ab[abOfs + 9] = (b8 * a1) + (b9 * a5) + (b10 * a9) + (b11 * a13);
  ab[abOfs + 10] = (b8 * a2) + (b9 * a6) + (b10 * a10) + (b11 * a14);
  ab[abOfs + 11] = (b8 * a3) + (b9 * a7) + (b10 * a11) + (b11 * a15);
  ab[abOfs + 12] = (b12 * a0) + (b13 * a4) + (b14 * a8) + (b15 * a12);
  ab[abOfs + 13] = (b12 * a1) + (b13 * a5) + (b14 * a9) + (b15 * a13);
  ab[abOfs + 14] = (b12 * a2) + (b13 * a6) + (b14 * a10) + (b15 * a14) ;
  ab[abOfs + 15] = (b12 * a3) + (b13 * a7) + (b14 * a11) + (b15 * a15) ;
};

/**
 * Rotates matrix m by angle a (in degrees) around the axis (x, y, z)
 * @param {Array<number>} rm returns the result
 * @param rmOffset index into rm where the result matrix starts
 * @param m source matrix
 * @param mOffset index into m where the source matrix starts
 * @param a angle to rotate in degrees
 * @param x scale factor x
 * @param y scale factor y
 * @param z scale factor z
 */
webglue.rotateM = function (rm, rmOffset, m, mOffset, a, x, y, z) {
  webglue.setRotateM(webglue.tmpMatrix_, 0, a, x, y, z);
  webglue.multiplyMM(rm, rmOffset, m, mOffset, webglue.tmpMatrix_, 0);
};
    
/**
 * Creates a rotation matrix for rotating by angle a (in degrees) around the axis (x, y, z)
 * @param {Array<number>} rm returns the result
 * @param {nunber}rmOffset index into rm where the result matrix starts
 * @param {number}a angle to rotate in degrees
 * @param {number} x X-component of the rotation axis
 * @param {number} y Y-component of the rotation axis
 * @param {number} z Z-component of the rotation axis
 */
webglue.setRotateM = function (rm, rmOffset, a, x, y, z) {
  rm[rmOffset + 3] = 0;
  rm[rmOffset + 7] = 0;
  rm[rmOffset + 11]= 0;
  rm[rmOffset + 12]= 0;
  rm[rmOffset + 13]= 0;
  rm[rmOffset + 14]= 0;
  rm[rmOffset + 15]= 1;
  a *= (Math.PI / 180.0);
  var s = Math.sin(a);
  var c = Math.cos(a);
  if (1.0 === x && 0.0 === y && 0.0 === z) {
    rm[rmOffset + 5] = c;   rm[rmOffset + 10]= c;
    rm[rmOffset + 6] = s;   rm[rmOffset + 9] = -s;
    rm[rmOffset + 1] = 0;   rm[rmOffset + 2] = 0;
    rm[rmOffset + 4] = 0;   rm[rmOffset + 8] = 0;
    rm[rmOffset + 0] = 1;
  } else if (0.0 === x && 1.0 === y && 0.0 === z) {
    rm[rmOffset + 0] = c;   rm[rmOffset + 10]= c;
    rm[rmOffset + 8] = s;   rm[rmOffset + 2] = -s;
    rm[rmOffset + 1] = 0;   rm[rmOffset + 4] = 0;
    rm[rmOffset + 6] = 0;   rm[rmOffset + 9] = 0;
    rm[rmOffset + 5] = 1;
  } else if (0.0 === x && 0.0 === y && 1.0 === z) {
    rm[rmOffset + 0] = c;   rm[rmOffset + 5] = c;
    rm[rmOffset + 1] = s;   rm[rmOffset + 4] = -s;
    rm[rmOffset + 2] = 0;   rm[rmOffset + 6] = 0;
    rm[rmOffset + 8] = 0;   rm[rmOffset + 9] = 0;
    rm[rmOffset + 10]= 1;
  } else {
    var len = webglue.length(x, y, z);
    if (1.0 != len) {
      var recipLen = 1.0 / len;
      x *= recipLen;
      y *= recipLen;
      z *= recipLen;
    }
    var nc = 1.0 - c;
    var xy = x * y;
    var yz = y * z;
    var zx = z * x;
    var xs = x * s;
    var ys = y * s;
    var zs = z * s;       
    rm[rmOffset +  0] = x*x*nc +  c;
    rm[rmOffset +  4] =  xy*nc - zs;
    rm[rmOffset +  8] =  zx*nc + ys;
    rm[rmOffset +  1] =  xy*nc + zs;
    rm[rmOffset +  5] = y*y*nc +  c;
    rm[rmOffset +  9] =  yz*nc - xs;
    rm[rmOffset +  2] =  zx*nc - ys;
    rm[rmOffset +  6] =  yz*nc + xs;
    rm[rmOffset + 10] = z*z*nc +  c;
  }
};
    

/**
 * @param {Array<number>} tm target matrix.
 * @param {number} tmOffser target matrix offset.
 * @param {Array<number>} m The matrix to translate.
 * @param {number} mOffset Matrix offset.
 * @param {number} x Translation x-component
 * @param {number} y Translation y-component
 * @param {number} z Translation z-component
 */ 
webglue.translateM = function (tm, tmOffset, m, mOffset, x, y, z) {
  for (var i = 0 ; i < 4; i++) {
    var tmi = tmOffset + i;
    var mi = mOffset + i;
    tm[12 + tmi] = m[mi] * x + m[4 + mi] * y + m[8 + mi] * z + m[12 + mi];
  }
};


webglue.last = function(arr) {
  return arr[arr.length - 1];
};

/**
 * The context manages the modelview, projection and texture matrix
 * @constructor
 */
webglue.Context = function (gl) {
  this.gl = gl;
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, webglue.VERTEX_SHADER_SOURCE);
  gl.compileShader(vertexShader);
      
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, webglue.FRAGMENT_SHADER_SOURCE);
  gl.compileShader(fragmentShader);
    
  var program = this.program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);
  
  this.positionLocation = gl.getAttribLocation(program, "a_position");
  this.colorLocation = gl.getAttribLocation(program, "a_color");
  this.texCoordLocation0 = gl.getAttribLocation(program, "a_texcoord0");
  this.normalLocation = gl.getAttribLocation(program, "a_normal");
  
  this.enableTextureLocation = gl.getUniformLocation(program, "enable_tex");
    
  this.mvpLocation = gl.getUniformLocation(program, "mvp_matrix");
  this.modelViewLocation = gl.getUniformLocation(program, "modelview_matrix");

  // TODO: Change to float buffers.  
  this.projectionMatrixStack_ = [new Float32Array(16)];
  this.modelViewMatrixStack_ = [new Float32Array(16)];
  this.texture0MatrixStack_ = [new Float32Array(16)];
  this.texture1MatrixStack_ = [new Float32Array(16)];
  this.enableTexBuffer_ = new Int32Array(2);
  this.activeTexture_ = 0;
  this.matrixMode_ = webglue.MODELVIEW;
  this.currentMatrixFlag_ = 1;
  this.currentMatrixStack_ = this.modelViewMatrixStack_;
  this.matrixDirty_ = 255;
  this.currentMatrix = this.modelViewMatrixStack_[0];
  this.mvpMatrix_ = new Float32Array(16);
};

webglue.Context.prototype.loadIdentity = function() {
  this.currentMatrixStack_[this.currentMatrixStack_.length - 1] = 
      this.currentMatrix_ = webglue.IDENTITY_MATRIX.slice();
};

webglue.Context.prototype.matrixMode = function(mm) {
  switch (mm) {
  case webglue.MODELVIEW:
    this.currentMatrixStack_ = this.modelViewMatrixStack_;
    this.currentMatrixFlag_ = 1;
    break;
  case webglue.PROJECTION:
    this.currentMatrixStack_ = this.projectionMatrixStack_;
    this.currentMatrixFlag_ = 2;
    break;
  case webglue.TEXTURE:
    if (this.activeTexture_ === 0) {
      this.currentMatrixStack_ = this.texture0MatrixStack_;
      this.currentMatrixFlag = 4;
    } else {
      this.currentMatrixStack_ = this.texture1MatrixStack_;
      this.currentMatrixFlag_ = 8;
    }
    break;
  default:
    throw "Unrecoginzed matrix mode: " + mm;
  }
  this.matrixMode_ = mm;
  this.currentMatrix_ = this.currentMatrixStack_[this.currentMatrixStack_.length - 1];
};

webglue.Context.prototype.multMatrix = function(matrix) {
  webglue.multiplyMM(this.currentMatrix_, 0, this.currentMatrix_, 0, matrix, 0);
  this.matrixDirty |= this.currentMatrixFlag_;
};

webglue.Context.prototype.enable = function(what) {
  if (what == webglue.TEXTURE_2D) {
    this.enableTexBuffer_[this.activeTexture_] = 1;
  } 
}

webglue.Context.prototype.disable = function(what) {
  if (what == webglue.TEXTURE_2D) {
    this.enableTexBuffer_[this.activeTexture_] = 0;
  } 
}

webglue.Context.prototype.frustum = function(left, right, bottom, top, zNear, zFar) {
  var matrix = [
      2 * zNear / (right - left), 0, 0, 0,
      0, 2 * zNear / (top - bottom), 0, 0,
      0, 0, -(zFar + zNear) / (zFar - zNear), -1,
      0, 0, -2 * zFar * zNear / (zFar - zNear), 0
  ];
  this.multMatrix(matrix);
};

webglue.Context.prototype.perspective = function(fovy, aspect, zNear, zFar) {
  var top = zNear * Math.tan(fovy * (Math.PI / 360.0));
  var bottom = -top;
  var left = bottom * aspect;
  var right = top * aspect;
  this.frustum(left, right, bottom, top, zNear, zFar);
};
         
         
webglue.Context.prototype.prepare = function() {
  if ((this.matrixDirty_ & 3) !== 0) {
    webglue.multiplyMM(this.mvpMatrix_, 0, webglue.last(this.projectionMatrixStack_), 0, 
        webglue.last(this.modelViewMatrixStack_), 0);
    this.gl.uniformMatrix4fv(this.mvpLocation, false, this.mvpMatrix_);
        
    if ((this.matrixDirty_ & 1) !== 0) {
      this.gl.uniformMatrix4fv(this.modelViewLocation, false, webglue.last(this.modelViewMatrixStack_));
    }
  }

  this.gl.uniform1iv(this.enableTextureLocation, this.enableTexBuffer_);
    
  //this.gl.uniformMatrix4fv(this.mvpLocation, false, [1,0,0,0,  0,1,0,0, 0,0,1,0, 0,0,0,1]);
  // this.gl.uniformMatrix4fv(this.modelViewLocation, false, [1,0,0,0,  0,1,0,0, 0,0,1,0, 0,0,0,1]);

    /*
    if ((matrixDirty & (MATRIX_TEXTURE_0 | MATRIX_TEXTURE_1)) != 0) {
      if ((matrixDirty & MATRIX_TEXTURE_0) != 0) {
        texMatrixBuffer.position(0);
        texMatrixBuffer.put(texture0Matrix, texture0MatrixSp, 16);
      }
      if ((matrixDirty & MATRIX_TEXTURE_1) != 0) {
        texMatrixBuffer.position(16);
        texMatrixBuffer.put(texture1Matrix, texture0MatrixSp, 16);
      }
      texMatrixBuffer.position(0);
      gl.glUniformMatrix4fv(uTexMatrix, 2, false, texMatrixBuffer);
    }
    */
    
  this.matrixDirty = 0;


//    int enableTex0 = texture0Enabled /*&& (arraysEnabled & (1 << ARRAY_TEXCOORD_0)) != 0*/ ? 1 : 0;
//    int enableTex1 = texture1Enabled /*&& (arraysEnabled & (1 << ARRAY_TEXCOORD_1)) != 0 */? 1 : 0;
/*    if (enableTex0 != oldEnableTex0 || enableTex1 != oldEnableTex1) {
      enableTexBuffer.put(0, enableTex0);
      enableTexBuffer.put(1, enableTex1);
      gl.glUniform1iv(uTextureEnabled, 2, enableTexBuffer);
      oldEnableTex0 = enableTex0;
      oldEnableTex1 = enableTex1;
    }
  }
  */
};


webglue.Context.prototype.rotatef = function(angle, x, y, z) {
  if (x !== 0 || y !== 0 || z !== 0) {
    // right thing to do? or rotate around a default axis?
    webglue.rotateM(this.currentMatrix_, 0, this.currentMatrix_, 0, angle, x, y, z);
  }
  this.matrixDirty |= this.currentMatrixFlag;
};


webglue.Context.prototype.translatef = function(x, y, z) {
  webglue.translateM(this.currentMatrix_, 0, this.currentMatrix_, 0, x, y, z);
  this.matrixDirty_ |= this.currentMatrixFlag;
};

          
/**
 * @constructor
 * @param {WebGLContext} context
 * @param {=number} opt_options
 * @param {=number} opt_maxEdges
 */
webglue.MeshBuilder = function (context, opt_options, opt_maxEdges) {
  var gl = context.gl;
  var options = opt_options || 0;
  var maxEdges = opt_maxEdges || 1024;

  this.context = context;
  this.options = options;
  this.hasColor = (options & webglue.MeshBuilder.Options.COLOR) !== 0;
  this.hasNormal = (options & webglue.MeshBuilder.Options.NORMALS) !== 0;
  this.hasTexCoords = (options & webglue.MeshBuilder.Options.TEXTURE) !== 0;

  this.glArrayBuffer = gl.createBuffer();
  this.glIndexBuffer = gl.createBuffer();
  this.glTexture = this.hasTexCoords ? gl.createTexture() : null;

  this.maxEdges = maxEdges;
  var byteBuffer = new ArrayBuffer(maxEdges * 2 * 3);
  this.indexBuffer = new Uint16Array(byteBuffer);
    
  byteBuffer = new ArrayBuffer(maxEdges * webglue.MeshBuilder.BYTE_STRIDE);
  this.floatBuffer = new Float32Array(byteBuffer);
  this.intBuffer = new Uint32Array(byteBuffer);

  this.mode = webglue.TRIANGLES;

  this.color = 0;
  this.texCoordS = this.texCoordT = 0;
  this.normalX = this.normalY = this.normalZ = 0;

  this.floatBufferPos = 0;
  this.modeStartEdge = 0;
  this.edgeCount = this.indexCount = 0;
  this.tx = this.ty = this.tz = 0;
    
  this.committedIndexCount = -1;
};


webglue.MeshBuilder.FLOATS_PER_EDGE = 9;
webglue.MeshBuilder.BYTE_STRIDE = webglue.MeshBuilder.FLOATS_PER_EDGE * Float32Array.BYTES_PER_ELEMENT;

webglue.MeshBuilder.Options = {
  COLOR: 1,
  NORMALS: 2,
  TEXTURE: 4
};


webglue.MeshBuilder.COLOR_OFFSET = 6;
webglue.MeshBuilder.TEX_COORD_OFFSET = 7;
webglue.MeshBuilder.NORMAL_OFFSET = 3;


/**
 * @param {number} r Red value (0..1)
 * @param {number} g Green value (0..1)
 * @param {number} b Blue value (0..1)
 */
webglue.MeshBuilder.prototype.color3f = function(r, g, b) {
  this.color = (Math.round(r * 255) ) | 
               (Math.round(g * 255) << 8) |
               (Math.round(b * 255) << 16) | (255 << 24);
};

webglue.MeshBuilder.prototype.texCoord2f = function(s, t) {
  this.texCoordS = s;
  this.texCoordT = t;
};

webglue.MeshBuilder.prototype.normal3f = function(x, y, z) {
  this.normalX = x;
  this.normalY = y;
  this.normalZ = z;
};

webglue.MeshBuilder.prototype.loadTexture = function(name) {
  var image = new Image();
  var self = this;
  window.console.log("loadTexture: " + name);
  image.onload = function() {
    window.console.log("loaded: " + image);
    var gl = self.context.gl;
    gl.bindTexture(gl.TEXTURE_2D, self.glTexture);
    
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
 
    //gl.texImage2D(gl.TEXTURE_2D, 0, image, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
  };
  image.src = name;
};

/**
 * @param {webglue.MeshBuilder.Mode} mode
 * @param {number} options Bit-combination of the desired options.
 */
webglue.MeshBuilder.prototype.begin = function(mode) {
  this.mode = mode;

  this.floatBufferPos = 0;
  this.modeStartEdge = 0;
  this.edgeCount = this.indexCount = 0;
  this.tx = this.ty = this.tz = 0;
  
  this.committedIndexCount = -1;
};

/**
 * Changes the mode, see begin().
 * 
 * @param {number} mode The new mode.
 */
webglue.MeshBuilder.prototype.setMode = function(mode) {
  this.mode = mode;
  this.modeStartEdge = this.edgeCount;
};

/**
 * Adds a vertex with the given coordinates and other attributes as defined
 * by options and set previously.
 * 
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
webglue.MeshBuilder.prototype.vertex3f = function(x, y, z) {
  var floatBufferPos = this.floatBufferPos;
  var floatBuffer = this.floatBuffer;
  floatBuffer[floatBufferPos + 0] = x + this.tx;
  floatBuffer[floatBufferPos + 1] = y + this.ty;
  floatBuffer[floatBufferPos + 2] = z + this.tz;
  if (this.hasColor) {
    this.intBuffer[floatBufferPos + webglue.MeshBuilder.COLOR_OFFSET] = this.color;
  } 
  if (this.hasNormal) {
    floatBuffer[floatBufferPos + webglue.MeshBuilder.NORMAL_OFFSET + 0] = this.normalX;
    floatBuffer[floatBufferPos + webglue.MeshBuilder.NORMAL_OFFSET + 1] = this.normalY;
    floatBuffer[floatBufferPos + webglue.MeshBuilder.NORMAL_OFFSET + 2] = this.normalZ;
  } 
  if (this.hasTexCoords) {
    floatBuffer[floatBufferPos + webglue.MeshBuilder.TEX_COORD_OFFSET + 0] = this.texCoordS;
    floatBuffer[floatBufferPos + webglue.MeshBuilder.TEX_COORD_OFFSET + 1] = this.texCoordT;
  }
  this.floatBufferPos += webglue.MeshBuilder.FLOATS_PER_EDGE;
  this.edgeCount++;
    
  var edgeCount = this.edgeCount;
  var indexBuffer = this.indexBuffer;
  var indexCount = this.indexCount;
    
  switch(this.mode) {
  case webglue.POINTS:
  case webglue.TRIANGLES:
  case webglue.LINES:
    indexBuffer[this.indexCount++] = edgeCount - 1;
    break;
  case webglue.QUADS:
    if (((this.edgeCount - this.modeStartEdge) & 3) === 0) {
      indexBuffer[indexCount + 0] = edgeCount - 4;
      indexBuffer[indexCount + 1] = edgeCount - 3;
      indexBuffer[indexCount + 2] = edgeCount - 2;
        
      indexBuffer[indexCount + 3] = edgeCount - 4;
      indexBuffer[indexCount + 4] = edgeCount - 2;
      indexBuffer[indexCount + 5] = edgeCount - 1;
      this.indexCount += 6;
    }
    break;
  case webglue.TRIANGLE_FAN:
    if ((this.edgeCount - this.modeStartEdge > 3)) {
      indexBuffer[indexCount + 0] = this.modeStartEdge;
      indexBuffer[indexCount + 1] = edgeCount - 2;
      indexBuffer[indexCount + 2] = edgeCount - 1;
      this.indexCount += 3;
    } else {
      indexBuffer[this.indexCount++] = edgeCount - 1;
    }
    break;
  case webglue.TRIANGLE_STRIP:
    if (edgeCount - this.modeStartEdge > 3) {
      indexBuffer[indexCount + 0] = edgeCount - 3;
      indexBuffer[indexCount + 2] = edgeCount - 2;
      indexBuffer[indexCount + 1] = edgeCount - 1;
      this.indexCount += 3;
    } else {
      indexBuffer[this.indexCount++] = edgeCount - 1;
    }
    break;
  default:
    throw "Unrecognized mode: " + this.mode;
  }
};

/*
  public Mode getMode() {
    return mode;
  }

  public ByteBuffer getBuffer() {
    return byteBuffer;
  }

  public int getOptions() {
    return options;
  }

  public int getColorByteOffset() {
    return COLOR_OFFSET * FLOAT_SIZE;
  }

  public int getTexCoordByteOffset() {
    return TEX_COORD_OFFSET * FLOAT_SIZE;
  }

  public int getByteStride() {
    return BYTE_STRIDE;
  }

  public int getByteLimit() {
    return edgeCount * BYTE_STRIDE;
  }
  
  public int getIndexCount() {
    return indexCount;
  }

  public ShortBuffer getIndices() {
    return indexBuffer;
  }
*/


webglue.MeshBuilder.prototype.draw = function() {
  var context = this.context;
  var gl = context.gl;
    
  //debugger;
  context.prepare();

  gl.bindBuffer(gl.ARRAY_BUFFER, this.glArrayBuffer);

  gl.enableVertexAttribArray(context.positionLocation);
  gl.vertexAttribPointer(context.positionLocation, 3, gl.FLOAT, false, webglue.MeshBuilder.BYTE_STRIDE, 0);
    
  if (this.hasColor) {
    gl.enableVertexAttribArray(context.colorLocation);
    gl.vertexAttribPointer(context.colorLocation, 4, gl.UNSIGNED_BYTE, true, webglue.MeshBuilder.BYTE_STRIDE, webglue.MeshBuilder.COLOR_OFFSET * 4);
  } else {
    gl.vertexAttrib4f(context.colorLocation, 1,1,1,1);
    gl.disableVertexAttribArray(context.colorLocation);
  }
  
  if (this.hasTexCoords) {
    context.enable(webglue.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
    gl.enableVertexAttribArray(context.texCoordLocation0);
    gl.vertexAttribPointer(context.texCoordLocation0, 2, gl.FLOAT, false, webglue.MeshBuilder.BYTE_STRIDE, webglue.MeshBuilder.TEX_COORD_OFFSET * 4);
  } else {
    gl.disableVertexAttribArray(context.texCoordLocation0);
    context.disable(webglue.TEXTURE_2D);
  }
    
  //gl.drawArrays(gl.TRIANGLES, 0, 3);
  // gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.glIndexBuffer);
  
  if (this.indexCount != this.committedIndexCount) {
    window.console.log("mb", this);

    gl.bufferData(gl.ARRAY_BUFFER, this.floatBuffer, gl.STATIC_DRAW);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer, gl.STATIC_DRAW);
    this.committedIndexCount = this.indexCount;
  }
  gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);
};

webglue.MeshBuilder.prototype.end = webglue.MeshBuilder.prototype.draw;

    
/*
    byteBuffer.position(0);
    gl.glEnableClientState(GL11.GL_VERTEX_ARRAY);
//    gl.glBindBuffer(GL11.GL_ARRAY_BUFFER, vboHandle);
    gl.glVertexPointer(3, GL11.GL_FLOAT, BYTE_STRIDE, floatBuffer);

    if (hasColor) {
      gl.glEnableClientState(GL11.GL_COLOR_ARRAY);
      byteBuffer.position(getColorByteOffset());
      gl.glVertexPointer(4, GL11.GL_UNSIGNED_BYTE, BYTE_STRIDE, byteBuffer);
    } else {
      gl.glDisableClientState(GL11.GL_COLOR_ARRAY);
    }
    
//    if (hasNormal) {
//      gl.glEnableClientState(GL11.GL_NORMAL_ARRAY);
//      byteBuffer.position(NORMAL_OFFSET * FLOAT_SIZE);
//      gl.glNormalPointer(GL11.GL_FLOAT, BYTE_STRIDE, byteBuffer);
//    } else {
//      gl.glDisableClientState(GL11.GL_NORMAL_ARRAY);
//    }

    if (hasTexCoords) {
      gl.glEnableClientState(GL11.GL_TEXTURE_COORD_ARRAY);
      byteBuffer.position(getTexCoordByteOffset());
      gl.glTexCoordPointer(2, GL11.GL_FLOAT, BYTE_STRIDE, byteBuffer);
    } else {
      gl.glDisableClientState(GL11.GL_TEXTURE_COORD_ARRAY);
    }
    
    if (indexCount % 3 != 0) {
      System.out.println("Unexpected index count: " + indexCount);
    }
    // TODO(haustein) fix in PlayN
    indexBuffer.limit(indexCount);
    gl.glDrawElements(GL11.GL_TRIANGLES, indexCount, GL11.GL_UNSIGNED_SHORT, indexBuffer);
    indexBuffer.limit(indexBuffer.capacity());
    
   // GLDebug.checkError(gl, "drawElements");
//    gl.glDrawArrays(mode, 0, pos / FLOATS_PER_EDGE);
    
    if (hasColor) {
      gl.glDisableClientState(GL11.GL_COLOR_ARRAY);
    }
    if (hasTexCoords) {
      gl.glDisableClientState(GL11.GL_TEXTURE_COORD_ARRAY);
    }
  //  gl.glBindBuffer(GL11.GL_ARRAY_BUFFER, 0);
  */

webglue.MeshBuilder.prototype.translate = function(tx, ty, tz) {
  this.tx = tx;
  this.ty = ty;
  this.tz = tz;
};

webglue.MeshBuilder.prototype.vertex2f = function(x, y) {
    this.vertex3f(x, y, 0);
};

// Copyright (c) 2009 Aaftab Munshi, Dan Ginsburg, Dave Shreiner
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this 
// software and associated documentation files (the "Software"), to deal in the Software
// without restriction, including without limitation the rights to use, copy, modify, 
// merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
// permit persons to whom the Software is furnished to do so, subject to the following 
// conditions:
//
// The above copyright notice and this permission notice shall be included in all copies
// or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
// PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
// CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
// OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
// Book:      OpenGL(R) ES 2.0 Programming Guide
// Authors:   Aaftab Munshi, Dan Ginsburg, Dave Shreiner
// ISBN-10:   0321502795
// ISBN-13:   9780321502797
// Publisher: Addison-Wesley Professional
// URLs:      http://safari.informit.com/9780321563835
//            http://www.opengles-book.com
//            http://www.opengles-book.com/downloads.html

webglue.VERTEX_SHADER_SOURCE = 
    "#ifdef GL_ES\n" + 
    "  precision mediump float;\n" +
    "#endif\n" +

    "#define NUM_TEXTURES 2\n" +
  
    "struct light {" +
    "  vec4 position;" +
    "  vec4 ambient_color;" +
    "  vec4 diffuse_color;" +
    "  vec4 specular_color;" +
    "  vec3 spot_direction;" +
    "  vec3 attenuation_factors;" +
    "  float spot_exponent;" +  
    "  float spot_cutoff_angle;" +
    "  bool compute_distance_attenuation;" +
    "};" +
      
    "struct material {" +
    "  vec4 ambient_color;" +
    "  vec4 diffuse_color;" +
    "  vec4 specular_color;" +
    "  vec4 emissive_color;" +
    "  float specular_exponent;" +
    "};" +

    "uniform mat4 mvp_matrix;" +
    "uniform mat4 modelview_matrix;" +  
    "uniform mat3 inv_modelview_matrix;" +
    "uniform mat4 tex_matrix[NUM_TEXTURES];" +
    "uniform bool enable_tex[NUM_TEXTURES];" + 
    "uniform bool enable_tex_matrix[NUM_TEXTURES];" +
     
    "uniform material material_state;" +
    "uniform vec4 ambient_scene_color;" +
    "uniform light light_state[8];" +
    "uniform bool light_enable_state[8];" +
    "uniform int num_lights;" +
    "uniform bool enable_lighting;" +
    "uniform bool light_model_two_sided;" +
    "uniform bool enable_color_material;" +
      
    "uniform bool enable_fog;" + 
    "uniform int fog_mode;" +
    "uniform float fog_density;" +
    "uniform float fog_start;" +
    "uniform float fog_end;" +

    "uniform bool xform_eye_p;" +
    "uniform bool normalize_normal;" +
    "uniform float rescale_normal_factor;" +
      
    "uniform vec4 ucp_eqn;" +
    "uniform bool enable_ucp;" +
      
    // Vertex attributes
    
    "attribute vec4 a_position;" +
    "attribute vec4 a_texcoord0;" +
    "attribute vec4 a_texcoord1;" +
    "attribute vec4 a_color;" + 
    "attribute vec3 a_normal;" +

    // Varying variables
      
    "varying vec4 v_front_color;" + 
    "varying vec4 v_texcoord[NUM_TEXTURES];" +
    "varying vec4 v_back_color;" + 
    "varying float v_fog_factor;" +
    "varying float v_ucp_factor;" +
      
    // Temporary variables used by the vertex shader

    "vec4 p_eye;" +
    "vec3 n;" +
    "vec4 mat_ambient_color;" +
    "vec4 mat_diffuse_color;" +
      
    // Lighting equation
      /*
    "vec4 lighting_equation(int i) {" +
    "  vec4 computed_color = vec4(0.0, 0.0, 0.0, 0.0);" +
    "  vec3 h_vec;" +
    "  float ndotl, ndoth;" +
    "  float att_factor;" + 
    "    float spot_factor;" +
    "    vec3 att_dist;" +
    "    vec3 VPpli;" +
    "  att_factor = 1.0;" +
    "  if(light_state[i].position.w != 0.0) {" +
    "    VPpli = light_state[i].position.xyz - p_eye.xyz;" +
    "    if(light_state[i].compute_distance_attenuation) {" +
    "      att_dist.x = 1.0;" +
    "      att_dist.z = dot(VPpli, VPpli);" +
    "      att_dist.y = sqrt(att_dist.z);" +
    "      att_factor = 1.0 / dot(att_dist, light_state[i].attenuation_factors);" +
    "    }" +
    "    VPpli = normalize(VPpli);" +
    "    if (light_state[i].spot_cutoff_angle < 180.0) {" +
    "      spot_factor = dot(-VPpli, light_state[i].spot_direction);" +
    "      if (spot_factor >= cos(radians(light_state[i].spot_cutoff_angle))) {" +
    "        spot_factor = pow(spot_factor, light_state[i].spot_exponent);" +
    "      } else {" +
    "        spot_factor = 0.0;" +
    "      }" +
    "      att_factor *= spot_factor;" +
    "    }" +
    "  } else {" +
    "    VPpli = light_state[i].position.xyz;" +
    "  }" +
    "  if (att_factor > 0.0) {" +
    "    computed_color += (light_state[i].ambient_color * mat_ambient_color);" +
    "    ndotl = max(0.0, dot(n, VPpli));" +
    "    computed_color += (ndotl * light_state[i].diffuse_color * mat_diffuse_color);" +
    "    h_vec = normalize(VPpli + vec3(0.0, 0.0, 1.0));" +
    "    ndoth = dot(n, h_vec);" +
    "    if (ndoth > 0.0) {" +
    "      computed_color *= (pow(ndoth, material_state.specular_exponent) * " +
    "                                   material_state.specular_color *" +
    "                                   light_state[i].specular_color);" +
    "    }" +
    "    computed_color *= att_factor;" +
    "  }" +
    "  return computed_color;" +
    "}" +
*/
    "float compute_fog() {" + 
    "  float f;" +
    "  float distance;" + 
    "  distance = length(p_eye);" + //?
    "  if (fog_mode == 2048) {" + // GL_EXP
    "    f = exp(-(distance * fog_density));" +
    "  } else if (fog_mode == 9729) {" + // GL_LINEAR
    "    f = (fog_end - distance) / (fog_end - fog_start);" +
    "  } else {" +
    "    f = distance * fog_density;" +
    "  }" +
    "  f = clamp(f, 0.0, 1.0);" +
    "  return f;" +
    "}" +
/*      
    "vec4 do_lighting() {" +
    "  vec4 vtx_color;" +
    "  int i, j;" +
    "  vtx_color = material_state.emissive_color +" +
    "      (mat_ambient_color * ambient_scene_color);" +
    "  j = 0;" +
    "  for (int i = 0; i < 8; i++) {" +
    "    if (j >= num_lights) {" +
    "      break;" +
    "    }" +
    "    if (light_enable_state[i]) {" +
    "      j++;" +
    "      vtx_color += lighting_equation(i);" +
    "    }" +
    "  }" +
    "  vtx_color.a = mat_diffuse_color.a;" +
    "  return vtx_color;" +
    "}" + 
*/
    "void main() {" +
    "  if (enable_fog) {" + // TODO(haustein) xform_eye_p
    "    p_eye = modelview_matrix * a_position;" +
    "  }" +

    "  gl_Position = mvp_matrix * a_position;" +
    "  v_front_color = a_color;" + 
    "  v_texcoord[0] = a_texcoord0;" + // tex_matrix[0] * a_texcoord0;" +
    "  v_texcoord[1] = a_texcoord1;" +// tex_matrix[1] * a_texcoord1;" +
    "  v_fog_factor = enable_fog ? compute_fog() : 1.0;" +
    "}\n";


webglue.FRAGMENT_SHADER_SOURCE =
    "#ifdef GL_ES\n" + 
    "  precision mediump float;\n" +
    "#endif\n" +
  
    "#define NUM_TEXTURES 2\n" +
      
    "uniform bool enable_tex[NUM_TEXTURES];" + 
      
    "" + // Keep this ---------------------
    "uniform sampler2D sampler0;\n" +
    "uniform sampler2D sampler1;\n" +
    "uniform float alphaMin;\n" +
    "uniform vec4 fog_color;" +
 
    "varying vec4 v_front_color;\n" +
    "varying vec4 v_texcoord[NUM_TEXTURES];\n" +
    "varying float v_fog_factor;\n" +
          
    "vec4 finalColor;\n" +        

    "void main() {\n" +
    "  finalColor = v_front_color;\n" +
    // Textures
    "  if (enable_tex[0]) { \n" +
    "    vec4 texel0 = texture2D(sampler0, vec2(v_texcoord[0].x, v_texcoord[0].y)); \n" +
    "    finalColor = finalColor * texel0;" +
    "  }" +
         
    "  if (enable_tex[1]) { \n" +
    "      vec4 texel1 = texture2D(sampler1, vec2(v_texcoord[1].x, v_texcoord[1].y)); \n" +
    "      finalColor = finalColor * texel1;" +
    "  } \n" +

    // FOG
    "  finalColor = vec4(v_fog_factor * finalColor.r + fog_color.r * (1.0 - v_fog_factor)," +
    "                    v_fog_factor * finalColor.g + fog_color.g * (1.0 - v_fog_factor)," +
    "                    v_fog_factor * finalColor.b + fog_color.b * (1.0 - v_fog_factor)," +
    "                    finalColor.a);" +

    "  if (finalColor.a <= alphaMin) {\n" +
    "    discard;\n" +
    "  }\n" +
    "  gl_FragColor = finalColor;\n" +
    "}\n";
          