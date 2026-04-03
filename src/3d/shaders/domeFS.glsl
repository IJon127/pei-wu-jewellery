varying vec2 vUv0;
varying vec3 vPosition;

void main(void) {
    // simple vertical gradient
    float h = normalize(vPosition).y;
    vec3 topColor = vec3(1.0, 0.99, 0.9);
    vec3 bottomColor = vec3(0.5, 0.36, 0.45);
    gl_FragColor = vec4(mix(bottomColor, topColor, clamp(h * 0.5 + 0.5, 0.0, 1.0)), 1.0);
}