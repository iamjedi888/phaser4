import { GameObjectCache } from "../gameobjects/GameObjectCache";
import { GetChildIDsFromParentID } from "../components/hierarchy/GetChildIDsFromParentID";
import { GetRandom } from "../utils/array/GetRandom";
export function GetRandomChild(parent, startIndex = 0, length) {
  const children = GetChildIDsFromParentID(parent.id);
  if (children.length > 0) {
    const random = GetRandom(children, startIndex, length);
    return GameObjectCache.get(random);
  }
}
