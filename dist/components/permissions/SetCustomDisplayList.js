import { PERMISSION, PermissionsComponent } from "./PermissionsComponent";
export function SetCustomDisplayList(id, value) {
  PermissionsComponent.data[id][PERMISSION.CUSTOM_DISPLAY_LIST] = Number(value);
}
