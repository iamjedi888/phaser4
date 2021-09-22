function Area(a, b, c) {
  return (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
}
function IsConvex(p1, p2, p3) {
  return Area(p1, p2, p3) < 0;
}
function InCone(p1, p2, p3, p) {
  const convex = IsConvex(p1, p2, p3);
  if (convex) {
    return IsConvex(p1, p2, p) && IsConvex(p2, p3, p);
  } else {
    return IsConvex(p1, p2, p) || IsConvex(p2, p3, p);
  }
}
function Equals(a, b) {
  return a.x === b.x && a.y === b.y;
}
function Intersects(p11, p12, p21, p22) {
  if (Equals(p11, p21) || Equals(p11, p22) || Equals(p12, p21) || Equals(p12, p22)) {
    return false;
  }
  const v1ortX = p12.y - p11.y;
  const v1ortY = p11.x - p12.x;
  const v2ortX = p22.y - p21.y;
  const v2ortY = p21.x - p22.x;
  const v21X = p21.x - p11.x;
  const v21Y = p21.y - p11.y;
  const dot21 = v21X * v1ortX + v21Y * v1ortY;
  const v22X = p22.x - p11.x;
  const v22Y = p22.y - p11.y;
  const dot22 = v22X * v1ortX + v22Y * v1ortY;
  const v11X = p11.x - p21.x;
  const v11Y = p11.y - p21.y;
  const dot11 = v11X * v2ortX + v11Y * v2ortY;
  const v12X = p12.x - p21.x;
  const v12Y = p12.y - p21.y;
  const dot12 = v12X * v2ortX + v12Y * v2ortY;
  return !(dot11 * dot12 > 0 || dot21 * dot22 > 0);
}
function IsClockwise(polygon) {
  let sum = 0;
  for (let i = 0, len = polygon.length; i < len; ++i) {
    const p1 = polygon[i];
    const p2 = polygon[(i + 1) % len];
    sum += (p2.x - p1.x) * (p2.y + p1.y);
  }
  return sum > 0;
}
export function RemoveHoles(polygon, holes, doNotCheckOrdering = false) {
  if (!doNotCheckOrdering) {
    if (IsClockwise(polygon)) {
      throw new Error("Polygon should be counterclockwise");
    }
    holes.forEach((hole) => {
      if (!IsClockwise(hole)) {
        throw new Error("Hole should be clockwise");
      }
    });
  }
  holes = holes.slice();
  while (holes.length) {
    let holeIndex = -1;
    let holePointIndex = -1;
    let holeLargestX = -Infinity;
    for (let i = 0, holesLen = holes.length; i < holesLen; ++i) {
      const hole2 = holes[i];
      for (let j = 0, holeLen = hole2.length; j < holeLen; ++j) {
        const point = hole2[j];
        const x = point.x;
        if (x > holeLargestX) {
          holeLargestX = x;
          holeIndex = i;
          holePointIndex = j;
        }
      }
    }
    const holePoint = holes[holeIndex][holePointIndex];
    const polyLen = polygon.length;
    let polyPointIndex = -1;
    for (let i = 0; i < polyLen; ++i) {
      const p1 = polygon[(i + polyLen - 1) % polyLen];
      const p2 = polygon[i];
      const p3 = polygon[(i + 1) % polyLen];
      if (!InCone(p1, p2, p3, holePoint)) {
        continue;
      }
      const polyPoint = p2;
      if (polyPointIndex >= 0) {
        const bestPoint = polygon[polyPointIndex];
        const v1x = polyPoint.x - holePoint.x;
        const v1y = polyPoint.y - holePoint.y;
        const v1Len = Math.sqrt(v1x * v1x + v1y * v1y);
        const v2x = bestPoint.x - holePoint.x;
        const v2y = bestPoint.y - holePoint.y;
        const v2Len = Math.sqrt(v2x * v2x + v2y * v2y);
        if (v2x / v2Len > v1x / v1Len) {
          continue;
        }
      }
      let pointVisible = true;
      for (let j = 0; j < polyLen; ++j) {
        const lineP1 = polygon[j];
        const lineP2 = polygon[(j + 1) % polyLen];
        if (Intersects(holePoint, polyPoint, lineP1, lineP2)) {
          pointVisible = false;
          break;
        }
      }
      if (pointVisible) {
        polyPointIndex = i;
      }
    }
    if (polyPointIndex < 0) {
      throw new Error("Failed to find cutting point. There may be self-intersection in the polygon.");
    }
    const newPoly = [];
    for (let i = 0; i <= polyPointIndex; ++i) {
      newPoly.push(polygon[i]);
    }
    const hole = holes[holeIndex];
    for (let i = 0, len = hole.length; i <= len; ++i) {
      newPoly.push(hole[(i + holePointIndex) % len]);
    }
    for (let i = polyPointIndex; i < polyLen; ++i) {
      newPoly.push(polygon[i]);
    }
    polygon = newPoly;
    holes.splice(holeIndex, 1);
  }
  return polygon;
}
function UpdateVertex(vertex, vertices) {
  if (!vertex.shouldUpdate) {
    return;
  }
  vertex.shouldUpdate = false;
  const v1 = vertex.prev.point;
  const v2 = vertex.point;
  const v3 = vertex.next.point;
  vertex.isConvex = IsConvex(v1, v2, v3);
  let v1x = v1.x - v2.x;
  let v1y = v1.y - v2.y;
  const v1Len = Math.sqrt(v1x * v1x + v1y * v1y);
  v1x /= v1Len;
  v1y /= v1Len;
  let v3x = v3.x - v2.x;
  let v3y = v3.y - v2.y;
  const v3Len = Math.sqrt(v3x * v3x + v3y * v3y);
  v3x /= v3Len;
  v3y /= v3Len;
  vertex.angleCos = v1x * v3x + v1y * v3y;
  if (vertex.isConvex) {
    vertex.isEar = true;
    for (let i = 0, len = vertices.length; i < len; ++i) {
      const curr = vertices[i];
      if (!curr.isActive || curr === vertex) {
        continue;
      }
      if (Equals(v1, curr.point) || Equals(v2, curr.point) || Equals(v3, curr.point)) {
        continue;
      }
      const areaA = Area(v1, curr.point, v2);
      const areaB = Area(v2, curr.point, v3);
      const areaC = Area(v3, curr.point, v1);
      if (areaA > 0 && areaB > 0 && areaC > 0) {
        vertex.isEar = false;
        break;
      }
      if (areaA === 0 && areaB >= 0 && areaC >= 0) {
        if (Area(v1, curr.prev.point, v2) > 0 || Area(v1, curr.next.point, v2) > 0) {
          vertex.isEar = false;
          break;
        }
      }
      if (areaB === 0 && areaA >= 0 && areaC >= 0) {
        if (Area(v2, curr.prev.point, v3) > 0 || Area(v2, curr.next.point, v3) > 0) {
          vertex.isEar = false;
          break;
        }
      }
      if (areaC === 0 && areaA >= 0 && areaB >= 0) {
        if (Area(v3, curr.prev.point, v1) > 0 || Area(v3, curr.next.point, v1) > 0) {
          vertex.isEar = false;
          break;
        }
      }
    }
  } else {
    vertex.isEar = false;
  }
}
function RemoveCollinearOrDuplicate(start) {
  for (let curr = start, end = start; ; ) {
    if (Equals(curr.point, curr.next.point) || Area(curr.prev.point, curr.point, curr.next.point) === 0) {
      curr.prev.next = curr.next;
      curr.next.prev = curr.prev;
      curr.prev.shouldUpdate = true;
      curr.next.shouldUpdate = true;
      if (curr === curr.next) {
        break;
      }
      end = curr.prev;
      curr = curr.next;
      continue;
    }
    curr = curr.next;
    if (curr === end) {
      break;
    }
  }
}
export function Triangulate(polygon, doNotCheckOrdering = false) {
  if (!doNotCheckOrdering) {
    if (IsClockwise(polygon)) {
      throw new Error("Polygon should be counterclockwise");
    }
  }
  if (polygon.length < 4) {
    return [polygon];
  }
  const len = polygon.length;
  const vertices = [];
  const triangles = [];
  for (let i = 0; i < len; ++i) {
    vertices.push({
      isActive: true,
      isConvex: false,
      isEar: false,
      point: polygon[i],
      angleCos: 0,
      shouldUpdate: true,
      index: i
    });
  }
  for (let i = 0; i < len; ++i) {
    const vertex = vertices[i];
    vertex.prev = vertices[(i + len - 1) % len];
    vertex.next = vertices[(i + 1) % len];
  }
  vertices.forEach((vertex) => UpdateVertex(vertex, vertices));
  for (let i = 0; i < len - 3; ++i) {
    let ear = null;
    for (let j = 0; j < len; ++j) {
      const vertex = vertices[j];
      if (!vertex.isActive || !vertex.isEar) {
        continue;
      }
      if (!ear) {
        ear = vertex;
      } else if (vertex.angleCos > ear.angleCos) {
        ear = vertex;
      }
    }
    if (!ear) {
      for (let i2 = 0; i2 < len; ++i2) {
        const vertex = vertices[i2];
        if (vertex.isActive) {
          const p1 = vertex.prev.point;
          const p2 = vertex.point;
          const p3 = vertex.next.point;
          if (Math.abs(Area(p1, p2, p3)) > 1e-5) {
            throw new Error("Failed to find ear. There may be self-intersection in the polygon.");
          }
        }
      }
      break;
    }
    triangles.push([ear.prev.point, ear.point, ear.next.point]);
    ear.isActive = false;
    ear.prev.next = ear.next;
    ear.next.prev = ear.prev;
    ear.prev.shouldUpdate = true;
    ear.next.shouldUpdate = true;
    RemoveCollinearOrDuplicate(ear.next);
    if (i === len - 4) {
      break;
    }
    for (let i2 = 0; i2 < len; ++i2) {
      UpdateVertex(vertices[i2], vertices);
    }
  }
  for (let i = 0; i < len; ++i) {
    const vertex = vertices[i];
    if (vertex.isActive) {
      vertex.prev.isActive = false;
      vertex.next.isActive = false;
      const p1 = vertex.prev.point;
      const p2 = vertex.point;
      const p3 = vertex.next.point;
      if (Math.abs(Area(p1, p2, p3)) > 1e-5) {
        triangles.push([p1, p2, p3]);
      }
    }
  }
  return triangles;
}
export function ConvexPartition(polygon, doNotCheckOrdering = false) {
  let convex = true;
  for (let i = 0, len = polygon.length; i < len; ++i) {
    if (!IsConvex(polygon[(i + len - 1) % len], polygon[i], polygon[(i + 1) % len])) {
      convex = false;
      break;
    }
  }
  if (convex) {
    return [polygon];
  }
  const ret = [];
  const triangles = Triangulate(polygon, doNotCheckOrdering);
  for (; triangles.length; ) {
    let poly = triangles.splice(0, 1)[0];
    for (let iPoly = 0, polyLen = poly.length; iPoly < polyLen; ++iPoly) {
      const diag1 = poly[iPoly];
      const diag2 = poly[(iPoly + 1) % polyLen];
      let tri3 = null;
      let iTri2 = 0;
      for (; iTri2 < triangles.length; ++iTri2) {
        const triangle = triangles[iTri2];
        for (let i = 0; i < 3; ++i) {
          const tri1 = triangle[i];
          const tri2 = triangle[(i + 1) % 3];
          if (Equals(diag1, tri2) && Equals(diag2, tri1)) {
            tri3 = triangle[(i + 2) % 3];
            break;
          }
        }
        if (tri3) {
          break;
        }
      }
      if (!tri3) {
        continue;
      }
      if (Area(poly[(iPoly + polyLen - 1) % polyLen], diag1, tri3) > 0) {
        continue;
      }
      if (Area(tri3, diag2, poly[(iPoly + 2) % polyLen]) > 0) {
        continue;
      }
      const newPoly = [];
      for (let i = (iPoly + 1) % polyLen; i != iPoly; i = (i + 1) % polyLen) {
        newPoly.push(poly[i]);
      }
      newPoly.push(diag1, tri3);
      poly = newPoly;
      polyLen = newPoly.length;
      iPoly = -1;
      triangles.splice(iTri2, 1);
    }
    ret.push(poly);
  }
  return ret;
}
