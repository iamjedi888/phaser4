import { PERMISSION, PermissionsComponent } from "./PermissionsComponent";
export function WillUpdate(id) {
  return !!PermissionsComponent.data[id][PERMISSION.WILL_UPDATE];
}
