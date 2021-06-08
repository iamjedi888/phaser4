import { PermissionsComponent } from "./PermissionsComponent";
export function WillCacheChildren(id) {
  return Boolean(PermissionsComponent.willCacheChildren[id]);
}
