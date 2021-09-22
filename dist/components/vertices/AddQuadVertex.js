import { GameObjectWorld } from "../../GameObjectWorld";
import { QuadVertexComponent } from "./QuadVertexComponent";
import { SetQuadColor } from "./SetQuadColor";
import { SetQuadPosition } from "./SetQuadPosition";
import { SetUV } from "./SetUV";
import { addComponent } from "bitecs";
export function AddQuadVertex(id, width = 0, height = 0) {
  addComponent(GameObjectWorld, QuadVertexComponent, id);
  if (width || height) {
    SetUV(id, 0, 0, 1, 1);
    SetQuadColor(id, 1, 1, 1, 1);
    SetQuadPosition(id, 0, 0, 0, height, width, height, width, 0);
  }
}
