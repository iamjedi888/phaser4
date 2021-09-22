import { PERMISSION, PermissionsComponent } from "./PermissionsComponent";
export function GetVisibleChildren(id) {
  return Boolean(PermissionsComponent.data[id][PERMISSION.VISIBLE_CHILDREN]);
}
