import { Vec3, Vec3Normalize, Vec3Subtract } from "../math/vec3";
import { CreateVertexSet } from "../gameobjects3d/geometry/CreateVertexSet";
export function TorusGeometry(radius = 1, tube = 0.4, radialSegments = 8, tubularSegments = 6, arc = Math.PI * 2) {
  const data = CreateVertexSet();
  const {
    vertices,
    normals,
    uvs,
    indices
  } = data;
  const center = new Vec3();
  const vertex = new Vec3();
  const normal = new Vec3();
  for (let j = 0; j <= radialSegments; j++) {
    for (let i = 0; i <= tubularSegments; i++) {
      const u = i / tubularSegments * arc;
      const v = j / radialSegments * Math.PI * 2;
      vertex.x = (radius + tube * Math.cos(v)) * Math.cos(u);
      vertex.y = (radius + tube * Math.cos(v)) * Math.sin(u);
      vertex.z = tube * Math.sin(v);
      vertices.push(vertex.x, vertex.y, vertex.z);
      center.x = radius * Math.cos(u);
      center.y = radius * Math.sin(u);
      Vec3Subtract(vertex, center, normal);
      Vec3Normalize(normal, normal);
      normals.push(normal.x, normal.y, normal.z);
      uvs.push(i / tubularSegments);
      uvs.push(j / radialSegments);
    }
  }
  for (let j = 1; j <= radialSegments; j++) {
    for (let i = 1; i <= tubularSegments; i++) {
      const a = (tubularSegments + 1) * j + i - 1;
      const b = (tubularSegments + 1) * (j - 1) + i - 1;
      const c = (tubularSegments + 1) * (j - 1) + i;
      const d = (tubularSegments + 1) * j + i;
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }
  data.numberOfVertices = vertices.length;
  return data;
}
