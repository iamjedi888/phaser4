import { PermissionsComponent } from "./PermissionsComponent";
export function WillTransformChildren(id) {
  return Boolean(PermissionsComponent.willTransformChildren[id]);
}
