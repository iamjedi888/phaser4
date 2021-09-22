import { PERMISSION, PermissionsComponent } from "./PermissionsComponent";
export function SetWillTransformChildren(id, value) {
  PermissionsComponent.data[id][PERMISSION.WILL_TRANSFORM_CHILDREN] = Number(value);
}
