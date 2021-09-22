import { TRANSFORM, Transform2DComponent } from "./Transform2DComponent";
import { GameObjectWorld } from "../../GameObjectWorld";
import { addComponent } from "bitecs";
export function AddTransform2DComponent(id) {
  addComponent(GameObjectWorld, Transform2DComponent, id);
  const data = Transform2DComponent.data[id];
  data[TRANSFORM.SCALE_X] = 1;
  data[TRANSFORM.SCALE_Y] = 1;
  data[TRANSFORM.AXIS_ALIGNED] = 1;
}
