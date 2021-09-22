import { TRANSFORM, Transform2DComponent } from "../transform/Transform2DComponent";
export function SetInView(id, value) {
  Transform2DComponent.data[id][TRANSFORM.IN_VIEW] = Number(value);
}
