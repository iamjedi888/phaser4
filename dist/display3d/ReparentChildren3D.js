import {RemoveChildren3DBetween} from "./RemoveChildren3DBetween";
import {SetParent3D} from "./SetParent3D";
export function ReparentChildren3D(parent, newParent, beginIndex = 0, endIndex) {
  const moved = RemoveChildren3DBetween(parent, beginIndex, endIndex);
  SetParent3D(newParent, ...moved);
  moved.forEach((child) => {
  });
  return moved;
}
