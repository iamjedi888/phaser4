export const GORAUD_LAMBERT_FRAG = `#define SHADER_NAME GORAUD_LAMBERT_FRAG

precision highp float;

varying vec2 vTextureCoord;
varying vec4 vTintColor;

uniform sampler2D uTexture;

void main (void)
{
    vec4 color = texture2D(uTexture, vTextureCoord);

    gl_FragColor = vec4(color.rgb * vTintColor, color.a);
}`;
