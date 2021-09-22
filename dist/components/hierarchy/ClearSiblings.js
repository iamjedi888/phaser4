import { SetNextSiblingID } from "./SetNextSiblingID";
import { SetPreviousSiblingID } from "./SetPreviousSiblingID";
export function ClearSiblings(id) {
  SetNextSiblingID(id, 0);
  SetPreviousSiblingID(id, 0);
}
