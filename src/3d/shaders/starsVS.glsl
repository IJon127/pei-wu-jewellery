attribute float aStarId;
attribute vec2 aCornerOffset;

uniform mat4 matrix_model;
uniform mat4 matrix_view;
uniform mat4 matrix_projection;
uniform mat4 matrix_viewInverse;

uniform float uTime;

varying vec2 vCornerOffset;
varying float vFlicker;

// Basic hash function for procedural positioning
float hash(float n) { return fract(sin(n) * 43758.5453123); }

vec3 randomSpherePoint(float id) {
    float phi = hash(id) * 6.28318530718;
    float cosTheta = hash(id + 1.0) * 2.0 - 1.0;
    float theta = acos(cosTheta);
    // Cluster stars, but ensure they are at least 10 meters away from the center
    float r = 100.0 + pow(hash(id + 2.0), 2.5) * 60.0; 
    
    return vec3(
        r * sin(theta) * cos(phi),
        r * sin(theta) * sin(phi),
        r * cos(theta)
    );
}

void main() {
    vCornerOffset = aCornerOffset;
    
    // Procedural position
    vec3 center = randomSpherePoint(aStarId);
    
    // Stable flickering based on ID and time
    vFlicker = 0.7 + 0.3 * sin(uTime * (1.0 + hash(aStarId * 0.1) * 3.0) + aStarId);
    
    // Billboard logic: use camera right/up vectors from the viewInverse matrix
    vec3 cameraRight = matrix_viewInverse[0].xyz;
    vec3 cameraUp = matrix_viewInverse[1].xyz;
    
    float starSize = 0.1 + hash(aStarId * 0.5) * 0.18;
    
    vec3 worldPos = center + (cameraRight * aCornerOffset.x + cameraUp * aCornerOffset.y) * starSize;
    
    gl_Position = matrix_projection * matrix_view * vec4(worldPos, 1.0);
}
