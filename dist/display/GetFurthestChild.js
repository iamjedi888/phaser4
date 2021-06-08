import { GetVec2Distance } from "../math/vec2/GetVec2Distance";
export function GetFurthestChild(parent, point) {
  const children = parent.children;
  let furthest = null;
  let distance = 0;
  children.forEach((child) => {
    const childDistance = GetVec2Distance(point, child.getPosition());
    if (!furthest || childDistance > distance) {
      furthest = child;
      distance = childDistance;
    }
  });
  return furthest;
}
