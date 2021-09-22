import { DIRTY, DirtyComponent } from "./DirtyComponent";
export function WillUpdateTransform(id) {
  const data = DirtyComponent.data[id];
  return !!(data[DIRTY.WORLD_TRANSFORM] || data[DIRTY.CHILD_TRANSFORM]);
}
