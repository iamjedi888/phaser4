import { WillRender, WillRenderChildren } from "../components/permissions";
import { GameObjectTree } from "../gameobjects";
import { GetNumChildren } from "../components/hierarchy";
export function RebuildWorldList(world, parent) {
  if (WillRender(parent)) {
    if (world.id !== parent) {
      world.addToRenderList(parent, 0);
    }
    const children = GameObjectTree.get(parent);
    for (let i = 0; i < children.length; i++) {
      const nodeID = children[i];
      if (WillRender(nodeID)) {
        if (GetNumChildren(nodeID) > 0 && WillRenderChildren(nodeID)) {
          RebuildWorldList(world, nodeID);
        } else {
          world.addToRenderList(nodeID, 0);
          world.addToRenderList(nodeID, 1);
        }
      }
    }
    if (world.id !== parent) {
      world.addToRenderList(parent, 1);
    }
  }
}
