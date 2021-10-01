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

uniform vec2 uTileSize;
uniform vec2 uTilePosition;
uniform vec2 uTileOffset;
uniform vec2 uTileScale;
uniform vec2 uTileRotationOrigin;
uniform float uTileAngle;

uniform float uTime;

void main (void)
{
    //  Fixed GClements version - works for an atlas frame + offset + with working scale per axis

    vec2 uv = (vTextureCoord - 0.5) * uTileScale + (0.5 * uTileScale);

    //  Rotation

    float angle = uTime * 0.25;
    float kS = sin(angle);
	float kC = cos(angle);

    // uv -= uTileRotationOrigin;

    // uv = vec2(kC * uv.x - kS * uv.y, kS * uv.x + kC * uv.y);

    // uv += uTileRotationOrigin;

    //  Sine Wave

    float speed = 3.0;
    float verticleDensity = 2.0;
    float swayIntensity = 0.2;

    float offsetX = sin(uv.y * verticleDensity + uTime * speed) * swayIntensity;

    // uv.x += offsetX;

    //  Draw

    vec2 pixel = uTilePosition + uTileSize * fract(uv + uTileOffset);

    vec4 color = texture2D(uTexture, pixel);

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
