import { GetWorldFromParentID } from "../components/hierarchy/GetWorldFromParentID";
import { RemoveChildrenBetween } from "./RemoveChildrenBetween";
export function DestroyChildren(parent, beginIndex = 0, endIndex) {
  const removed = RemoveChildrenBetween(parent, beginIndex, endIndex);
  removed.forEach((child) => {
    child.destroy();
  });
  const world = GetWorldFromParentID(parent.id);
  if (world) {
    world.updateDisplayList = true;
  }
}
