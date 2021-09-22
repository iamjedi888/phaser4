import { PERMISSION, PermissionsComponent } from "./PermissionsComponent";
export function SetWillColorChildren(id, value) {
  PermissionsComponent.data[id][PERMISSION.WILL_COLOR_CHILDREN] = Number(value);
}
