precision mediump float;

varying vec2 vCornerOffset;
varying float vFlicker;

void main() {
    // Distance from center of the quad
    float dist = length(vCornerOffset);
    
    // Exponential falloff for a natural blurry glow
    float glow = exp(-dist * 5.0);
    
    float alpha = glow * vFlicker * 0.6;
    
    if (alpha < 0.01) discard;
    
    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
}
