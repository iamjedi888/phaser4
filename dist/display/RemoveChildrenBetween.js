import { ClearWorldAndParentID } from "../components/hierarchy/ClearWorldAndParentID";
import { GameObjectCache } from "../gameobjects/GameObjectCache";
import { GetChildIDsFromParent } from "../components/hierarchy/GetChildIDsFromParent";
import { GetNumChildren } from "../components/hierarchy/GetNumChildren";
import { RelinkChildren } from "../components/hierarchy/RelinkChildren";
export function RemoveChildrenBetween(parent, beginIndex = 0, endIndex) {
  const parentID = parent.id;
  if (endIndex === void 0) {
    endIndex = GetNumChildren(parentID);
  }
  const range = endIndex - beginIndex;
  if (range > 0 && range <= endIndex) {
    const children = GetChildIDsFromParent(parent);
    const removed = children.splice(beginIndex, range);
    removed.forEach((childID) => {
      ClearWorldAndParentID(childID);
    });
    RelinkChildren(parentID, children);
    removed.forEach((id) => parent.onRemoveChild(id));
    return removed.map((id) => GameObjectCache.get(id));
  } else {
    return [];
  }
}
