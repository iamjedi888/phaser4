export function GetQuadBuffer() {
  const quad = new Float32Array(54);
  quad[12] = 1;
  quad[20] = 1;
  quad[21] = 1;
  quad[38] = 1;
  quad[39] = 1;
  quad[47] = 1;
  return quad;
}
