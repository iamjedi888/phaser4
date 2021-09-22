import { GetChildIDsFromParent } from "../components/hierarchy/GetChildIDsFromParent";
import { RelinkChildren } from "../components/hierarchy/RelinkChildren";
import { Shuffle } from "../utils/array/Shuffle";
export function ShuffleChildren(parent) {
  const children = GetChildIDsFromParent(parent);
  Shuffle(children);
  RelinkChildren(parent.id, children);
  return parent.getChildren();
}
