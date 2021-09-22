import { GetFirstChildID } from "./GetFirstChildID";
import { GetNextSiblingID } from "./GetNextSiblingID";
export function GetChildIDsFromParent(parent) {
  let next = GetFirstChildID(parent.id);
  const output = [];
  while (next > 0) {
    output.push(next);
    next = GetNextSiblingID(next);
  }
  return output;
}
