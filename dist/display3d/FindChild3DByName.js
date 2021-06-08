import { DepthFirstSearch3D } from "./DepthFirstSearch3D";
export function FindChild3DByName(parent, searchString) {
  const children = DepthFirstSearch3D(parent);
  const regex = RegExp(searchString);
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (regex.test(child.name)) {
      return child;
    }
  }
}
