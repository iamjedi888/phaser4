import { GameInstance } from "../../GameInstance";
import { GetParentID } from "../hierarchy/GetParentID";
import { SetDirtyChildCache } from "./SetDirtyChildCache";
import { SetDirtyChildTransform } from "./SetDirtyChildTransform";
import { WillCacheChildren } from "../permissions/WillCacheChildren";
let prevParentID;
let prevFrame;
export function SetDirtyParents(childID) {
  let id = GetParentID(childID);
  const frame = GameInstance.getFrame();
  if (id === prevParentID && frame === prevFrame) {
    return;
  }
  prevParentID = id;
  prevFrame = frame;
  while (id) {
    SetDirtyChildTransform(id);
    if (WillCacheChildren(id)) {
      SetDirtyChildCache(id);
    }
    id = GetParentID(id);
  }
}
