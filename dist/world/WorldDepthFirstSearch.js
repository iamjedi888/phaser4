import { WillRender, WillRenderChildren } from "../components/permissions";
import { GameObjectTree } from "../gameobjects";
import { GetNumChildren } from "../components/hierarchy";
import { UpdateWorldTransform } from "../components/transform";
export function WorldDepthFirstSearch(world, parent, transformList, forceUpdate) {
  const renderList = world.renderList;
  const renderType = world.renderType;
  if (WillRender(parent)) {
    if (world.id !== parent) {
      renderList.push(parent);
      renderType.push(0);
    }
    if (!forceUpdate && transformList.indexOf(parent) > -1) {
      forceUpdate = true;
    }
    if (forceUpdate) {
      UpdateWorldTransform(parent);
    }
    const children = GameObjectTree.get(parent);
    for (let i = 0; i < children.length; i++) {
      const nodeID = children[i];
      if (WillRender(nodeID)) {
        if (GetNumChildren(nodeID) > 0 && WillRenderChildren(nodeID)) {
          WorldDepthFirstSearch(world, nodeID, transformList, forceUpdate);
        } else {
          renderList.push(nodeID);
          renderType.push(0);
          if (forceUpdate || transformList.indexOf(nodeID) > -1) {
            UpdateWorldTransform(nodeID);
          }
          renderList.push(nodeID);
          renderType.push(1);
        }
      }
    }
    if (world.id !== parent) {
      renderList.push(parent);
      renderType.push(1);
    }
  }
}
