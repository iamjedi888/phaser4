import { ClearWorld } from "./ClearWorld";
export function RemoveWorld(world, ...children) {
  children.forEach((child) => {
    ClearWorld(child.id);
  });
  return children;
}
