import { DepthFirstSearch3D } from "./DepthFirstSearch3D";
export function GetAllChildren3D(parent, property, value) {
  const children = DepthFirstSearch3D(parent);
  if (!property) {
    return children;
  }
  const results = [];
  children.forEach((child) => {
    const descriptor = Object.getOwnPropertyDescriptor(child, property);
    if (descriptor && (value === void 0 || value === descriptor.value)) {
      results.push(child);
    }
  });
  return results;
}
