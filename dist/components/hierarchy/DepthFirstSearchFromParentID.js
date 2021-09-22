import { GetFirstChildID } from "./GetFirstChildID";
import { MoveNext } from "./MoveNext";
export function DepthFirstSearchFromParentID(parentID, removeParent = true) {
  const output = [parentID];
  let next = GetFirstChildID(parentID);
  while (next > 0) {
    output.push(next);
    next = MoveNext(next, parentID);
  }
  if (removeParent) {
    output.shift();
  }
  return output;
}
