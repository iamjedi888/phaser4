import {DepthFirstSearch3D} from "./DepthFirstSearch3D";
export function SetChildren3DValue(parent, property, value) {
  const children = DepthFirstSearch3D(parent);
  children.forEach((child) => {
    const descriptor = Object.getOwnPropertyDescriptor(child, property);
    if (descriptor) {
      descriptor.set(value);
    }
  });
  return children;
}
