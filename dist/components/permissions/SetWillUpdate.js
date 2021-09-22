import { PERMISSION, PermissionsComponent } from "./PermissionsComponent";
export function SetWillUpdate(id, value) {
  PermissionsComponent.data[id][PERMISSION.WILL_UPDATE] = Number(value);
}
