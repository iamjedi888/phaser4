import { GetNumChildren } from "../hierarchy/GetNumChildren";
import { HasDirtyChildCache } from "../dirty/HasDirtyChildCache";
import { WillCacheChildren } from "./WillCacheChildren";
import { WillRenderChildren } from "./WillRenderChildren";
export function HasRenderableChildren(id, dirtyCamera) {
  const numChildren = GetNumChildren(id);
  if (numChildren === 0 || !WillRenderChildren(id)) {
    return 0;
  }
  if (dirtyCamera || !WillCacheChildren(id) || WillCacheChildren(id) && HasDirtyChildCache(id)) {
    return numChildren;
  }
  return 0;
}
