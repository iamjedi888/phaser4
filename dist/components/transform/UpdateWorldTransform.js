import { CopyLocalToWorld } from "./CopyLocalToWorld";
import { CopyWorldToWorld } from "./CopyWorldToWorld";
import { GetParentID } from "../hierarchy";
import { MultiplyLocalWithWorld } from "./MultiplyLocalWithWorld";
import { UpdateNumWorldTransforms } from "../../world/ResetWorldRenderData";
import { WillTransformChildren } from "../permissions/WillTransformChildren";
export function UpdateWorldTransform(id) {
  const parentID = GetParentID(id);
  if (parentID === 0) {
    CopyLocalToWorld(id, id);
  } else if (!WillTransformChildren(id)) {
    CopyWorldToWorld(parentID, id);
  } else {
    MultiplyLocalWithWorld(parentID, id);
  }
  UpdateNumWorldTransforms();
}
