import { PermissionsComponent } from "./PermissionsComponent";
export function SetWillRenderChildren(value, ...children) {
  children.forEach((child) => {
    PermissionsComponent.willRenderChildren[child.id] = Number(value);
  });
  return children;
}
