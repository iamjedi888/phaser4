import { PERMISSION, PermissionsComponent } from "./PermissionsComponent";
export function HasCustomDisplayList(id) {
  return !!PermissionsComponent.data[id][PERMISSION.CUSTOM_DISPLAY_LIST];
}
