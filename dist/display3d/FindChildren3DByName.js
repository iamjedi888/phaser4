import { DepthFirstSearch3D } from "./DepthFirstSearch3D";
export function FindChildren3DByName(parent, searchString) {
  const children = DepthFirstSearch3D(parent);
  const regex = RegExp(searchString);
  const results = [];
  children.forEach((child) => {
    if (regex.test(child.name)) {
      results.push(child);
    }
  });
  return results;
}
