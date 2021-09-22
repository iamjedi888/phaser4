import { PERMISSION, PermissionsComponent } from "./PermissionsComponent";
export function SetWillRender(id, value) {
  PermissionsComponent.data[id][PERMISSION.WILL_RENDER] = Number(value);
}
