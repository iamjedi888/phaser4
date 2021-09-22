import { PERMISSION, PermissionsComponent } from "./PermissionsComponent";
export function WillRender(id) {
  return !!PermissionsComponent.data[id][PERMISSION.VISIBLE] && !!PermissionsComponent.data[id][PERMISSION.WILL_RENDER];
}
