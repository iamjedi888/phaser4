import { TRANSFORM, Transform2DComponent } from "./Transform2DComponent";
import { SetDirtyTransform } from "../dirty/SetDirtyTransform";
export function UpdateExtent(id, width, height) {
  const data = Transform2DComponent.data[id];
  const x = -data[TRANSFORM.ORIGIN_X] * width;
  const y = -data[TRANSFORM.ORIGIN_Y] * height;
  data[TRANSFORM.FRAME_X1] = x;
  data[TRANSFORM.FRAME_Y1] = y;
  data[TRANSFORM.FRAME_X2] = x + width;
  data[TRANSFORM.FRAME_Y2] = y + height;
  data[TRANSFORM.FRAME_WIDTH] = width;
  data[TRANSFORM.FRAME_HEIGHT] = height;
  SetDirtyTransform(id);
}
