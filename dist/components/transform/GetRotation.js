import { TRANSFORM, Transform2DComponent } from "./Transform2DComponent";
export function GetRotation(id) {
  return Transform2DComponent.data[id][TRANSFORM.ROTATION];
}
