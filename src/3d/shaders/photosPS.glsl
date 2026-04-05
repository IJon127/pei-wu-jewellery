#include "gammaPS"

varying vec2 vUv0;
varying float vInstTexIndex;

uniform highp sampler2DArray uTextureArray;

void main(void)
{
    // For sampler2DArray in WebGL2, we must use texture() and a vec3(u, v, layer)
    vec3 uvw = vec3(vUv0, vInstTexIndex);
    vec4 color = texture(uTextureArray, uvw);

    gl_FragColor = vec4(gammaCorrectOutput(color.rgb), color.a);
}
