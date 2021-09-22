import { DepthFirstSearch } from "./DepthFirstSearch";
export function GetAllChildren(parent, property, value) {
  const children = DepthFirstSearch(parent);
  if (!property) {
    return children;
  }
  return children.filter((child) => {
    return property in child && (value === void 0 || child[property] === value);
  });
}
