varying vec3 vPositionO;

mat4 getModelMatrix() {
    return matrix_model;
}

vec4 getPosition() {
    dPositionW = (getModelMatrix() * vec4(vertex_position, 1.0)).xyz;
    vPositionO = vertex_position;
    return matrix_viewProjection * vec4(dPositionW, 1.0);
}

vec3 getWorldPosition() {
    return dPositionW;
}
