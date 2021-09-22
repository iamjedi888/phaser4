import { DepthFirstSearchFromParentID } from "../components/hierarchy/DepthFirstSearchFromParentID";
import { GameObjectCache } from "../gameobjects/GameObjectCache";
export function DepthFirstSearch(parent) {
  const children = DepthFirstSearchFromParentID(parent.id);
  return children.map((id) => GameObjectCache.get(id));
}
