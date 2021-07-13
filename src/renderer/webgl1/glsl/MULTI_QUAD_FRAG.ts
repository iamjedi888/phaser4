export const MULTI_QUAD_FRAG =
`#define SHADER_NAME MULTI_QUAD_FRAG
#define numTextures %count%

precision highp float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture[%count%];
uniform mat4 uColorMatrix;
uniform vec4 uColorOffset;

vec4 getSampler (int index, vec2 uv)
{
    for (int i = 0; i < numTextures; ++i)
    {
        vec4 color = texture2D(uTexture[i], uv);

        if (i == index)
        {
            return color;
        }
    }

    //  Return black
    return vec4(0);
}

void main (void)
{
    vec4 color = getSampler(int(vTextureId), vTextureCoord);

    gl_FragColor = color * vec4(vTintColor.rgb * vTintColor.a, vTintColor.a) * uColorMatrix + (uColorOffset / 255.0);
}`;
