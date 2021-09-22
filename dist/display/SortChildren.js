import { GameObjectCache } from "../gameobjects/GameObjectCache";
import { GetChildIDsFromParentID } from "../components/hierarchy/GetChildIDsFromParentID";
import { RelinkChildren } from "../components/hierarchy/RelinkChildren";
export function SortChildren(parent, propertyGetter) {
  const parentID = parent.id;
  const children = GetChildIDsFromParentID(parentID);
  children.sort((a, b) => {
    const childA = GameObjectCache.get(a);
    const childB = GameObjectCache.get(b);
    return propertyGetter(childA) - propertyGetter(childB);
  });
  RelinkChildren(parentID, children);
  return parent.getChildren();
}
