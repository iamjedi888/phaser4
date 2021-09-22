export function GetTriBuffer() {
  const tri = new Float32Array(27);
  tri[12] = 1;
  tri[20] = 1;
  tri[21] = 1;
  return tri;
}
