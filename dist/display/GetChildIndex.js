import { GetPreviousSiblingID } from "../components/hierarchy/GetPreviousSiblingID";
export function GetChildIndex(child) {
  const childID = child.id;
  let index = 0;
  let prev = GetPreviousSiblingID(childID);
  while (prev > 0) {
    prev = GetPreviousSiblingID(childID);
    index++;
  }
  return index;
}
