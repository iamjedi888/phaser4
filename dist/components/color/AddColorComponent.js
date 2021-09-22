import { ColorComponent } from "./ColorComponent";
import { DEFAULT_COLOR_MATRIX } from "../../colormatrix/const";
import { GameObjectWorld } from "../../GameObjectWorld";
import { addComponent } from "bitecs";
export function AddColorComponent(id) {
  addComponent(GameObjectWorld, ColorComponent, id);
  ColorComponent.r[id] = 255;
  ColorComponent.g[id] = 255;
  ColorComponent.b[id] = 255;
  ColorComponent.a[id] = 1;
  ColorComponent.colorMatrix[id].set(DEFAULT_COLOR_MATRIX);
}
