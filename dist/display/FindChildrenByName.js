import {DepthFirstSearch} from "./DepthFirstSearch";
export function FindChildrenByName(parent, searchString) {
  const children = DepthFirstSearch(parent);
  const regex = RegExp(searchString);
  const results = [];
  children.forEach((child) => {
    if (regex.test(child.name)) {
      results.push(child);
    }
  });
  return results;
}
