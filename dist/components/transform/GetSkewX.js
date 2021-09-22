import { TRANSFORM, Transform2DComponent } from "./Transform2DComponent";
export function GetSkewX(id) {
  return Transform2DComponent.data[id][TRANSFORM.SKEW_X];
}
