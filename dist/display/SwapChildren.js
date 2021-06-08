import { GetChildIndex } from "./GetChildIndex";
export function SwapChildren(child1, child2) {
  if (child1.parent === child2.parent) {
    const children = child1.parent.children;
    const index1 = GetChildIndex(child1.parent, child1);
    const index2 = GetChildIndex(child2.parent, child2);
    if (index1 !== index2) {
      children[index1] = child2;
      children[index2] = child1;
    }
  }
}
