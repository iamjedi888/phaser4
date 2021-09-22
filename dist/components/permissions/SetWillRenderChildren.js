import { PERMISSION, PermissionsComponent } from "./PermissionsComponent";
export function SetWillRenderChildren(id, value) {
  PermissionsComponent.data[id][PERMISSION.WILL_RENDER_CHILDREN] = Number(value);
}
