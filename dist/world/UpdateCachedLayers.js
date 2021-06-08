import { HasDirtyChildren } from "./HasDirtyChildren";
import { SetDirtyChildCache } from "../components/dirty";
export function UpdateCachedLayers(cachedLayers, dirtyCamera) {
  cachedLayers.forEach((layer) => {
    if (dirtyCamera || HasDirtyChildren(layer)) {
      SetDirtyChildCache(layer.node.id);
    } else {
      layer.children.length = 0;
    }
  });
}
