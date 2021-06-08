import { PermissionsComponent } from "./PermissionsComponent";
export function WillUpdateChildren(id) {
  return Boolean(PermissionsComponent.willUpdateChildren[id]);
}
