import { SetNextSiblingID } from "./SetNextSiblingID";
import { SetPreviousSiblingID } from "./SetPreviousSiblingID";
export function LinkSiblings(childA, childB) {
  SetNextSiblingID(childA, childB);
  SetPreviousSiblingID(childB, childA);
}
