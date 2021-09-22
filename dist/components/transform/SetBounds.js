import { TRANSFORM, Transform2DComponent } from "./Transform2DComponent";
export function SetBounds(id, x, y, right, bottom) {
  const data = Transform2DComponent.data[id];
  data[TRANSFORM.BOUNDS_X1] = x;
  data[TRANSFORM.BOUNDS_Y1] = y;
  data[TRANSFORM.BOUNDS_X2] = right;
  data[TRANSFORM.BOUNDS_Y2] = bottom;
}
