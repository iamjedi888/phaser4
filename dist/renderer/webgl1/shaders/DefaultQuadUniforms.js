export const DefaultQuadUniforms = {
  uProjectionMatrix: new Float32Array(16),
  uCameraMatrix: new Float32Array(16),
  uTexture: 0,
  uColorMatrix: new Float32Array([
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1
  ]),
  uColorOffset: new Float32Array(4)
};
