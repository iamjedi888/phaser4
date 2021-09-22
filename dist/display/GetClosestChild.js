import { GameObjectWorld } from "../GameObjectWorld";
import { GetChildrenFromParentID } from "../components/hierarchy/GetChildrenFromParentID";
import { GetVec2Distance } from "../math/vec2/GetVec2Distance";
import { Transform2DComponent } from "../components/transform/Transform2DComponent";
import { hasComponent } from "bitecs";
export function GetClosestChild(parent, point) {
  const children = GetChildrenFromParentID(parent.id);
  let closest = null;
  let distance = 0;
  children.forEach((child) => {
    if (hasComponent(GameObjectWorld, Transform2DComponent, child.id)) {
      const childDistance = GetVec2Distance(point, child.position);
      if (!closest || childDistance < distance) {
        closest = child;
        distance = childDistance;
      }
    }
  });
  return closest;
}
