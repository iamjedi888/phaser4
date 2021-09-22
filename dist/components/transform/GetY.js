import { TRANSFORM, Transform2DComponent } from "./Transform2DComponent";
export function GetY(id) {
  return Transform2DComponent.data[id][TRANSFORM.Y];
}
