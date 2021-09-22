export function DepthFirstSearchRecursive(parent, output = []) {
  for (const child of parent.getChildren()) {
    output.push(child);
    if (child.getNumChildren() > 0) {
      DepthFirstSearchRecursive(child, output);
    }
  }
  return output;
}
