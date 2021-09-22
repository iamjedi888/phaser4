import { PERMISSION, PermissionsComponent } from "./PermissionsComponent";
export function SetWillUpdateChildren(id, value) {
  PermissionsComponent.data[id][PERMISSION.WILL_UPDATE_CHILDREN] = Number(value);
}
