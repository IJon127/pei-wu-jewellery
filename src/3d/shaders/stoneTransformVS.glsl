varying vec3 vPositionO;

vec4 getPosition() {
    dPositionW = (getModelMatrix() * vec4(vertex_position.xyz, 1.0)).xyz;
    vPositionO = vertex_position.xyz;
    return matrix_viewProjection * vec4(dPositionW, 1.0);
}

vec3 getWorldPosition() {
    return dPositionW;
}
