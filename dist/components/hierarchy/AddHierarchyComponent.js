import { GameObjectWorld } from "../../GameObjectWorld";
import { HierarchyComponent } from "./HierarchyComponent";
import { addComponent } from "bitecs";
export function AddHierarchyComponent(id) {
  addComponent(GameObjectWorld, HierarchyComponent, id);
}
