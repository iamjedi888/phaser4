import { GetChild3DIndex } from "./GetChild3DIndex";
export function SwapChildren3D(child1, child2) {
  if (child1.parent === child2.parent) {
    const children = child1.parent.children;
    const index1 = GetChild3DIndex(child1.parent, child1);
    const index2 = GetChild3DIndex(child2.parent, child2);
    if (index1 !== index2) {
      children[index1] = child2;
      children[index2] = child1;
    }
  }
}
