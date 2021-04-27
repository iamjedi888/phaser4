import {CreateVertexSet} from "../gameobjects3d/geometry/CreateVertexSet";
export function PlaneGeometry(data, x = 0, y = 0, z = 0, u = 0, v = 1, w = 2, udir = 1, vdir = -1, width = 1, height = 1, depth = 1, gridX = 1, gridY = 1) {
  if (!data) {
    data = CreateVertexSet();
  }
  const {
    vertices,
    normals,
    uvs,
    indices,
    numberOfVertices
  } = data;
  const segmentWidth = width / gridX;
  const segmentHeight = height / gridY;
  const widthHalf = width / 2;
  const heightHalf = height / 2;
  const depthHalf = depth / 2;
  const gridX1 = gridX + 1;
  const gridY1 = gridY + 1;
  let vertexCounter = 0;
  const vector = [];
  for (let iy = 0; iy < gridY1; iy++) {
    const by = iy * segmentHeight - heightHalf;
    for (let ix = 0; ix < gridX1; ix++) {
      const bx = ix * segmentWidth - widthHalf;
      vector[u] = bx * udir;
      vector[v] = by * vdir;
      vector[w] = depthHalf;
      vertices.push(x + vector[0], y + vector[1], z + vector[2]);
      vector[u] = 0;
      vector[v] = 0;
      vector[w] = depth > 0 ? 1 : -1;
      normals.push(vector[0], vector[1], vector[2]);
      uvs.push(ix / gridX);
      uvs.push(1 - iy / gridY);
      vertexCounter += 1;
    }
  }
  for (let iy = 0; iy < gridY; iy++) {
    for (let ix = 0; ix < gridX; ix++) {
      const a = numberOfVertices + ix + gridX1 * iy;
      const b = numberOfVertices + ix + gridX1 * (iy + 1);
      const c = numberOfVertices + (ix + 1) + gridX1 * (iy + 1);
      const d = numberOfVertices + (ix + 1) + gridX1 * iy;
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }
  data.numberOfVertices += vertexCounter;
  return data;
}
