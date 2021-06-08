export function WorldDepthFirstSearch(cachedLayers, parent, output = []) {
  for (let i = 0; i < parent.numChildren; i++) {
    const node = parent.children[i];
    if (node.isRenderable()) {
      const children = [];
      const entry = { node, children };
      output.push(entry);
      if (node.willRenderChildren && node.numChildren > 0) {
        if (node.willCacheChildren) {
          cachedLayers.push(entry);
        }
        WorldDepthFirstSearch(cachedLayers, node, children);
      }
    }
  }
  return output;
}
