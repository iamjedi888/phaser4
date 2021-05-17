import {DIRTY_CONST} from "../../gameobjects/DIRTY_CONST";
import {PackColors} from "../../renderer/webgl1/colors/PackColors";
import {UpdateVertices} from "./UpdateVertices";
export function PreRenderVertices(gameObject) {
  if (gameObject.isDirty(DIRTY_CONST.COLORS)) {
    PackColors(gameObject.vertices);
    gameObject.clearDirty(DIRTY_CONST.COLORS);
  }
  if (gameObject.isDirty(DIRTY_CONST.TRANSFORM)) {
    UpdateVertices(gameObject);
    gameObject.clearDirty(DIRTY_CONST.TRANSFORM);
  }
  return gameObject;
}
