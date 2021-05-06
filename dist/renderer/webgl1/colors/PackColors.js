export function PackColors(vertices) {
  vertices.forEach((vertex) => {
    vertex.packColor();
  });
}
