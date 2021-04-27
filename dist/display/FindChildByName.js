import {DepthFirstSearch} from "./DepthFirstSearch";
export function FindChildByName(parent, searchString) {
  const children = DepthFirstSearch(parent);
  const regex = RegExp(searchString);
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (regex.test(child.name)) {
      return child;
    }
  }
}
