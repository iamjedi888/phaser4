import { PermissionsComponent } from "./PermissionsComponent";
export function SetWillRender(value, ...children) {
  children.forEach((child) => {
    PermissionsComponent.willRender[child.id] = Number(value);
  });
  return children;
}
