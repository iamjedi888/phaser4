export function UpdateFrameUVs(frame) {
  const { x, y, width, height } = frame;
  const baseTextureWidth = frame.texture.width;
  const baseTextureHeight = frame.texture.height;
  frame.u0 = x / baseTextureWidth;
  frame.v0 = y / baseTextureHeight;
  frame.u1 = (x + width) / baseTextureWidth;
  frame.v1 = (y + height) / baseTextureHeight;
  return frame;
}
