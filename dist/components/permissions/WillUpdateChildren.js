import { PERMISSION, PermissionsComponent } from "./PermissionsComponent";
export function WillUpdateChildren(id) {
  return !!PermissionsComponent.data[id][PERMISSION.WILL_UPDATE_CHILDREN];
}
