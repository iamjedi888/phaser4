import {CreateVertexSet} from "../gameobjects3d/geometry/CreateVertexSet";
import {Vec2} from "../math/vec2/Vec2";
import {Vec3} from "../math/vec3/Vec3";
import {Vec3Normalize} from "../math/vec3/Vec3Normalize";
function GenerateCap(top, data, index, halfHeight, radiusTop, radiusBottom, radialSegments, thetaStart, thetaLength) {
  const {
    vertices,
    normals,
    uvs,
    indices
  } = data;
  const uv = new Vec2();
  const vertex = new Vec3();
  const radius = top === true ? radiusTop : radiusBottom;
  const sign = top === true ? 1 : -1;
  const centerIndexStart = index;
  for (let x = 1; x <= radialSegments; x++) {
    vertices.push(0, halfHeight * sign, 0);
    normals.push(0, sign, 0);
    uvs.push(0.5, 0.5);
    index++;
  }
  const centerIndexEnd = index;
  for (let x = 0; x <= radialSegments; x++) {
    const u = x / radialSegments;
    const theta = u * thetaLength + thetaStart;
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);
    vertex.x = radius * sinTheta;
    vertex.y = halfHeight * sign;
    vertex.z = radius * cosTheta;
    vertices.push(vertex.x, vertex.y, vertex.z);
    normals.push(0, sign, 0);
    uv.x = cosTheta * 0.5 + 0.5;
    uv.y = sinTheta * 0.5 * sign + 0.5;
    uvs.push(uv.x, uv.y);
    index++;
  }
  for (let x = 0; x < radialSegments; x++) {
    const c = centerIndexStart + x;
    const i = centerIndexEnd + x;
    if (top) {
      indices.push(i, i + 1, c);
    } else {
      indices.push(i + 1, i, c);
    }
  }
  return index;
}
export function CylinderGeometry(radiusTop = 1, radiusBottom = 1, height = 1, radialSegments = 8, heightSegments = 1, openEnded = false, thetaStart = 0, thetaLength = Math.PI * 2) {
  const data = CreateVertexSet();
  const {
    vertices,
    normals,
    uvs,
    indices
  } = data;
  let index = 0;
  const indexArray = [];
  const halfHeight = height / 2;
  const normal = new Vec3();
  const vertex = new Vec3();
  const slope = (radiusBottom - radiusTop) / height;
  for (let y = 0; y <= heightSegments; y++) {
    const indexRow = [];
    const v = y / heightSegments;
    const radius = v * (radiusBottom - radiusTop) + radiusTop;
    for (let x = 0; x <= radialSegments; x++) {
      const u = x / radialSegments;
      const theta = u * thetaLength + thetaStart;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);
      vertex.x = radius * sinTheta;
      vertex.y = -v * height + halfHeight;
      vertex.z = radius * cosTheta;
      vertices.push(vertex.x, vertex.y, vertex.z);
      normal.set(sinTheta, slope, cosTheta);
      Vec3Normalize(normal, normal);
      normals.push(normal.x, normal.y, normal.z);
      uvs.push(u, 1 - v);
      indexRow.push(index++);
    }
    indexArray.push(indexRow);
  }
  for (let x = 0; x < radialSegments; x++) {
    for (let y = 0; y < heightSegments; y++) {
      const a = indexArray[y][x];
      const b = indexArray[y + 1][x];
      const c = indexArray[y + 1][x + 1];
      const d = indexArray[y][x + 1];
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }
  if (!openEnded) {
    if (radiusTop > 0) {
      index = GenerateCap(true, data, index, halfHeight, radiusTop, radiusBottom, radialSegments, thetaStart, thetaLength);
    }
    if (radiusBottom > 0) {
      GenerateCap(false, data, index, halfHeight, radiusTop, radiusBottom, radialSegments, thetaStart, thetaLength);
    }
  }
  data.numberOfVertices = vertices.length;
  return data;
}
