import { PermissionsComponent } from "./PermissionsComponent";
export function WillUpdate(id) {
  return Boolean(PermissionsComponent.willUpdate[id]);
}
