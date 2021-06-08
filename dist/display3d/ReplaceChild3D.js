import { AddChild3DAt } from "./AddChild3DAt";
import { GetChild3DIndex } from "./GetChild3DIndex";
import { MoveChild3DTo } from "./MoveChild3DTo";
import { RemoveChild3D } from "./RemoveChild3D";
export function ReplaceChild3D(target, source) {
  const targetParent = target.parent;
  const sourceParent = source.parent;
  const targetIndex = GetChild3DIndex(targetParent, target);
  if (targetParent === sourceParent) {
    MoveChild3DTo(targetParent, source, targetIndex);
    RemoveChild3D(targetParent, target);
  } else {
    RemoveChild3D(targetParent, target);
    RemoveChild3D(sourceParent, source);
    AddChild3DAt(targetParent, targetIndex, source);
  }
  return target;
}
