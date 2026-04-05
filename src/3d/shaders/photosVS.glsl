attribute vec3 vertex_position;
attribute vec2 vertex_texCoord0;
attribute vec4 aInstMatrix0;
attribute vec4 aInstMatrix1;
attribute vec4 aInstMatrix2;
attribute vec4 aInstMatrix3;
attribute float aInstTexIndex;

uniform mat4 matrix_viewProjection;

varying vec2 vUv0;
varying float vInstTexIndex;

void main(void) {
    // Construct the 4x4 matrix from attributes
    mat4 instanceMatrix = mat4(aInstMatrix0, aInstMatrix1, aInstMatrix2, aInstMatrix3);
    
    // Pass attributes to fragment shader
    vUv0 = vertex_texCoord0;
    vInstTexIndex = aInstTexIndex;

    // Standard 3D transformation
    gl_Position = matrix_viewProjection * instanceMatrix * vec4(vertex_position, 1.0);
}
