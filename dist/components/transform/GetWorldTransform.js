import { TRANSFORM, Transform2DComponent } from "./Transform2DComponent";
export function GetWorldTransform(id) {
  const data = Transform2DComponent.data[id];
  return {
    a: data[TRANSFORM.WORLD_A],
    b: data[TRANSFORM.WORLD_B],
    c: data[TRANSFORM.WORLD_C],
    d: data[TRANSFORM.WORLD_D],
    tx: data[TRANSFORM.WORLD_TX],
    ty: data[TRANSFORM.WORLD_TY]
  };
}
