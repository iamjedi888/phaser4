import { GetVec2Distance } from "../math/vec2/GetVec2Distance";
export function GetClosestChild(parent, point) {
  const children = parent.children;
  let closest = null;
  let distance = 0;
  children.forEach((child) => {
    const childDistance = GetVec2Distance(point, child.getPosition());
    if (!closest || childDistance < distance) {
      closest = child;
      distance = childDistance;
    }
  });
  return closest;
}
