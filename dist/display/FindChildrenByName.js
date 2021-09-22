import { DepthFirstSearch } from "./DepthFirstSearch";
export function FindChildrenByName(parent, searchString) {
  const children = DepthFirstSearch(parent);
  const regex = RegExp(searchString);
  return children.filter((child) => regex.test(child.name));
}
