import { PERMISSION, PermissionsComponent } from "./PermissionsComponent";
export function WillCacheChildren(id) {
  return !!PermissionsComponent.data[id][PERMISSION.WILL_CACHE_CHILDREN];
}
