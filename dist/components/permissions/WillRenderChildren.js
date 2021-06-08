import { PermissionsComponent } from "./PermissionsComponent";
export function WillRenderChildren(id) {
  return Boolean(PermissionsComponent.visibleChildren[id]) && Boolean(PermissionsComponent.willRenderChildren[id]);
}
