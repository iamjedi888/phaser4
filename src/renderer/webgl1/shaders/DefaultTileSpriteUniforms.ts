export const DefaultTileSpriteUniforms: Record<string, Number | Float32List | Uint32List> =
{
    uProjectionMatrix: new Float32Array(16),
    uCameraMatrix: new Float32Array(16),
    uTextureSize: new Float32Array(2),
    uTexturePosition: new Float32Array(2),
    uOffset: new Float32Array(2),
    uScale: new Float32Array(2),
    uTexture: 0,
    uColorMatrix: new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]),
    uColorOffset: new Float32Array(4)
};
