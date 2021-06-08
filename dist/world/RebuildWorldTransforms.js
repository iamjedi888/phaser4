import { WillRender, WillRenderChildren } from "../components/permissions";
import { GameObjectTree } from "../gameobjects";
import { GetNumChildren } from "../components/hierarchy";
import { UpdateWorldTransform } from "../components/transform";
import { WillTransformChildren } from "../components/permissions/WillTransformChildren";
export function RebuildWorldTransforms(world, parent, transformList, forceUpdate) {
  if (WillRender(parent)) {
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
        if (GetNumChildren(nodeID) > 0) {
          if (WillRenderChildren(nodeID) && WillTransformChildren(nodeID)) {
            RebuildWorldTransforms(world, nodeID, transformList, forceUpdate);
          }
        } else if (forceUpdate || transformList.indexOf(nodeID) > -1) {
          UpdateWorldTransform(nodeID);
        }
      }
    }
  }
}
