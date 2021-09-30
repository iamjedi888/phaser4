/*
d7samurai

const float pixelSize =    4.00; // "fat pixel" size
const float zoom      =    8.00; // max zoom factor
const float radius    =  128.00; // planar movement radius
const float speed     =    0.25; // speed

////////////////////////////////////////////////////////////////////////////////////////////////////

void mainImage( out vec4 color, in vec2 pixel )
{
    // zoom & scroll
    float time   = iTime * speed;
	float scale  = pixelSize + ((cos((time + 8.0) / 3.7) + 1.0) / 2.0) * (zoom - 1.0) * pixelSize;
	vec2  center = vec2(-4.0, 16.0) + iResolution.xy / 2.0;
	vec2  offset = vec2(cos(time), sin(time)) * radius;

    pixel = ((pixel + offset) - center) / scale + center;

    // emulate point sampling
    vec2 uv = floor(pixel) + 0.5;

    // subpixel aa algorithm (COMMENT OUT TO COMPARE WITH POINT SAMPLING)
    uv += 1.0 - clamp((1.0 - fract(pixel)) * scale, 0.0, 1.0);

    // output
   	color = texture(iChannel0, uv / iChannelResolution[0].xy);
}
*/

export const TILESPRITE_FRAG =
`#define SHADER_NAME TILESPRITE_FRAG

precision highp float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;
uniform mat4 uColorMatrix;
uniform vec4 uColorOffset;
uniform float uTime;

const float pixelSize =    4.00; // "fat pixel" size
const float zoom      =    2.00; // max zoom factor
const float radius    =  512.00; // planar movement radius
const float speed     =    0.5; // speed

const vec2 iResolution = vec2(800.0, 600.0);
const vec2 uTextureResolution = vec2(512.0, 512.0);

void main (void)
{
    // zoom & scroll
    float time = uTime * speed;
	float scale = pixelSize + ((cos((time + 8.0) / 3.7) + 1.0) / 2.0) * (zoom - 1.0) * pixelSize;
    vec2 center = iResolution.xy / 2.0;
	vec2 offset = vec2(cos(time), sin(time)) * radius;

    scale = 1.0;
    // center.x = 400.0;
    // center.y = 300.0;
    // offset.x = -512.0;
    // offset.y = -256.0;

    vec2 pixel = vec2((gl_FragCoord.xy + offset) - center) / scale + center;

    vec2 uv = floor(pixel) + 0.5;

    uv += 1.0 - clamp((1.0 - fract(pixel)) * scale, 0.0, 1.0);

    // uv.y *= -1.0;

    vec4 color = texture2D(uTexture, uv / uTextureResolution.xy);

    //  Un pre-mult alpha
    if (color.a > 0.0)
    {
        color.rgb /= color.a;
    }

    vec4 result = color * uColorMatrix + (uColorOffset / 255.0);

    //  Pre-mult alpha
    result.rgb *= result.a;

    gl_FragColor = vec4(result.rgb, result.a);
}`;
