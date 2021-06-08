import { DepthFirstSearch3D } from "./DepthFirstSearch3D";
import { RemoveChild3D } from "./RemoveChild3D";
import { SetWorld3D } from "./SetWorld3D";
export function SetParent3D(parent, ...children) {
  children.forEach((child) => {
    if (child.parent) {
      RemoveChild3D(child.parent, child);
    }
    child.parent = parent;
  });
  const parentWorld = parent.world;
  if (parentWorld) {
    SetWorld3D(parentWorld, ...DepthFirstSearch3D(parent));
  }
  return children;
}
