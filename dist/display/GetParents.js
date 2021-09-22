export function GetParents(child) {
  const parents = [];
  let currentParent;
  while (child.hasParent()) {
    currentParent = child.getParent();
    parents.push(currentParent);
    child = currentParent;
  }
  return parents;
}
