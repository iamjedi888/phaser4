import { PermissionsComponent } from "./PermissionsComponent";
export function WillRender(id) {
  return Boolean(PermissionsComponent.visible[id]) && Boolean(PermissionsComponent.willRender[id]);
}
