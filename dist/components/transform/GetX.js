import { TRANSFORM, Transform2DComponent } from "./Transform2DComponent";
export function GetX(id) {
  return Transform2DComponent.data[id][TRANSFORM.X];
}
