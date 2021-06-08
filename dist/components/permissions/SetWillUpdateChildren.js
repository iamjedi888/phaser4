import { PermissionsComponent } from "./PermissionsComponent";
export function SetWillUpdateChildren(value, ...children) {
  children.forEach((child) => {
    PermissionsComponent.willUpdateChildren[child.id] = Number(value);
  });
  return children;
}
