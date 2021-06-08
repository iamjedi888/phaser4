export function DepthFirstSearchRecursiveNested3D(parent, output = []) {
  for (let i = 0; i < parent.numChildren; i++) {
    const node = parent.children[i];
    const children = [];
    output.push({ node, children });
    if (node.numChildren > 0) {
      DepthFirstSearchRecursiveNested3D(node, children);
    }
  }
  return output;
}
