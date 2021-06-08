import { PermissionsComponent } from "./PermissionsComponent";
export function SetWillCacheChildren(value, ...children) {
  children.forEach((child) => {
    PermissionsComponent.willCacheChildren[child.id] = Number(value);
  });
  return children;
}
