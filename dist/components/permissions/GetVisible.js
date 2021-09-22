import { PERMISSION, PermissionsComponent } from "./PermissionsComponent";
export function GetVisible(id) {
  return Boolean(PermissionsComponent.data[id][PERMISSION.VISIBLE]);
}
