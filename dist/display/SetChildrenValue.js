import { DepthFirstSearch } from "./DepthFirstSearch";
export function SetChildrenValue(parent, property, value) {
  const children = DepthFirstSearch(parent);
  children.forEach((child) => {
    if (property in child) {
      child[property] = value;
    }
  });
  return children;
}
