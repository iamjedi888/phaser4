import { PERMISSION, PermissionsComponent } from "./PermissionsComponent";
export function SetWillCacheChildren(id, value) {
  PermissionsComponent.data[id][PERMISSION.WILL_CACHE_CHILDREN] = Number(value);
}
