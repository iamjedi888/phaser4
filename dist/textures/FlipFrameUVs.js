export function FlipFrameUVs(frame) {
  frame.v0 = 1 - frame.v0;
  frame.v1 = 1 - frame.v1;
  return frame;
}
