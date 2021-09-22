import { TRANSFORM, Transform2DComponent } from "./Transform2DComponent";
import { GetParentID } from "../hierarchy/GetParentID";
import { GetWorldID } from "../hierarchy/GetWorldID";
import { WillTransformChildren } from "../permissions/WillTransformChildren";
export function SetRootTransform(id) {
  const worldID = GetWorldID(id);
  let currentParent = GetParentID(id);
  let isRootTransform = true;
  while (currentParent && currentParent !== worldID) {
    if (WillTransformChildren(currentParent)) {
      isRootTransform = false;
      break;
    }
    currentParent = GetParentID(currentParent);
  }
  Transform2DComponent.data[id][TRANSFORM.IS_ROOT] = Number(isRootTransform);
}
