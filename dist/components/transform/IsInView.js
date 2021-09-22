import { TRANSFORM, Transform2DComponent } from "./Transform2DComponent";
export function IsInView(id) {
  return !!Transform2DComponent.data[id][TRANSFORM.IN_VIEW];
}
