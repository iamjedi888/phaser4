import {DepthFirstSearch} from "./DepthFirstSearch";
import {RemoveChild} from "./RemoveChild";
import {SetWorld} from "./SetWorld";
export function SetParent(parent, ...children) {
  children.forEach((child) => {
    if (child.parent) {
      RemoveChild(child.parent, child);
    }
    child.parent = parent;
  });
  const parentWorld = parent.world;
  if (parentWorld) {
    SetWorld(parentWorld, ...DepthFirstSearch(parent));
  }
  return children;
}
