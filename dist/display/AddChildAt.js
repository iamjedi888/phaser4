import { AddChild } from "./AddChild";
import { AddChildAfter } from "./AddChildAfter";
import { AddChildBefore } from "./AddChildBefore";
import { GameObjectCache } from "../gameobjects/GameObjectCache";
import { GetFirstChildID } from "../components/hierarchy/GetFirstChildID";
import { GetNumChildren } from "../components/hierarchy/GetNumChildren";
import { IsValidParent } from "./IsValidParent";
import { MoveNext } from "../components/hierarchy/MoveNext";
export function AddChildAt(parent, child, index) {
  if (IsValidParent(parent, child)) {
    const parentID = parent.id;
    const numChildren = GetNumChildren(parentID);
    if (index < 0 || index > numChildren) {
      console.error("Index out of range");
      return child;
    }
    if (numChildren === 0) {
      AddChild(parent, child);
    } else {
      let next = GetFirstChildID(parentID);
      if (index === 0) {
        AddChildBefore(GameObjectCache.get(next), child);
      } else if (index === 1) {
        AddChildAfter(GameObjectCache.get(next), child);
      } else {
        let count = 1;
        while (next > 0 && count < index) {
          next = MoveNext(next, parentID);
          count++;
        }
        AddChildAfter(GameObjectCache.get(next), child);
      }
    }
  }
  return child;
}
