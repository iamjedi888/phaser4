import {AddChildAt} from "./AddChildAt";
import {GetChildIndex} from "./GetChildIndex";
import {MoveChildTo} from "./MoveChildTo";
import {RemoveChild} from "./RemoveChild";
export function ReplaceChild(target, source) {
  const targetParent = target.parent;
  const sourceParent = source.parent;
  const targetIndex = GetChildIndex(targetParent, target);
  if (targetParent === sourceParent) {
    MoveChildTo(targetParent, source, targetIndex);
    RemoveChild(targetParent, target);
  } else {
    RemoveChild(targetParent, target);
    RemoveChild(sourceParent, source);
    AddChildAt(targetParent, targetIndex, source);
  }
  return target;
}
