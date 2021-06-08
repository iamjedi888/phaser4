import { ClearWorldAndParentID, GetWorldID, UpdateNumChildren } from "../components/hierarchy";
import { GameObjectCache } from "../gameobjects/GameObjectCache";
import { GameObjectTree } from "../gameobjects/GameObjectTree";
import { SetDirtyDisplayList } from "../components/dirty/SetDirtyDisplayList";
export function RemoveChildAt(parent, index) {
  const children = GameObjectTree.get(parent.id);
  if (index >= 0 && index < children.length) {
    const removedID = children.splice(index, 1)[0];
    if (removedID) {
      const worldID = GetWorldID(removedID);
      SetDirtyDisplayList(worldID);
      ClearWorldAndParentID(removedID);
      UpdateNumChildren(parent.id);
      return GameObjectCache.get(removedID);
    }
  }
}
