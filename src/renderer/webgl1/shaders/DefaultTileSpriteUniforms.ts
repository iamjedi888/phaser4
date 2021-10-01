export const DefaultTileSpriteUniforms: Record<string, Number | Float32List | Uint32List> =
{
    uProjectionMatrix: new Float32Array(16),
    uCameraMatrix: new Float32Array(16),
    uTexture: 0,
    uColorMatrix: new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]),
    uColorOffset: new Float32Array(4),
    uTileSize: new Float32Array(2),
    uTilePosition: new Float32Array(2),
    uTileScale: new Float32Array(2),
    uTileOffset: new Float32Array(2),
    uTileRotationOrigin: new Float32Array(2),
    uTileAngle: 0
};
