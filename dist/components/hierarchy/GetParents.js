import { GetParentID } from "./GetParentID";
export function GetParents(id) {
  const results = [];
  let currentParent = GetParentID(id);
  while (currentParent) {
    results.push(currentParent);
    currentParent = GetParentID(currentParent);
  }
  return results;
}
