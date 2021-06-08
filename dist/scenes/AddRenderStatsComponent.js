import { GameObjectWorld } from "../GameObjectWorld";
import { RenderStatsComponent } from "./RenderStatsComponent";
import { addComponent } from "bitecs";
export function AddRenderStatsComponent(id) {
  addComponent(GameObjectWorld, RenderStatsComponent, id);
}
