import { TRANSFORM, Transform2DComponent } from "./Transform2DComponent";
import { SetDirtyTransform } from "../dirty/SetDirtyTransform";
export function SetExtent(id, x, y, width, height) {
  const data = Transform2DComponent.data[id];
  data[TRANSFORM.FRAME_X1] = x;
  data[TRANSFORM.FRAME_Y1] = y;
  data[TRANSFORM.FRAME_X2] = x + width;
  data[TRANSFORM.FRAME_Y2] = y + height;
  data[TRANSFORM.FRAME_WIDTH] = width;
  data[TRANSFORM.FRAME_HEIGHT] = height;
  SetDirtyTransform(id);
}
