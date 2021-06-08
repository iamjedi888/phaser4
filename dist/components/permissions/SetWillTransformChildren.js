import { PermissionsComponent } from "./PermissionsComponent";
export function SetWillTransformChildren(value, ...children) {
  children.forEach((child) => {
    PermissionsComponent.willTransformChildren[child.id] = Number(value);
  });
  return children;
}
