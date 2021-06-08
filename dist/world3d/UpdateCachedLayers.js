import { DIRTY_CONST } from "../gameobjects/DIRTY_CONST";
import { HasDirtyChildren } from "./HasDirtyChildren";
export function UpdateCachedLayers(cachedLayers, dirtyCamera) {
  cachedLayers.forEach((layer) => {
    if (dirtyCamera || HasDirtyChildren(layer)) {
      layer.node.setDirty(DIRTY_CONST.CHILD_CACHE);
    } else {
      layer.children.length = 0;
    }
  });
}
