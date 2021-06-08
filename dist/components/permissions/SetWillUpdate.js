import { PermissionsComponent } from "./PermissionsComponent";
export function SetWillUpdate(value, ...children) {
  children.forEach((child) => {
    PermissionsComponent.willUpdate[child.id] = Number(value);
  });
  return children;
}
