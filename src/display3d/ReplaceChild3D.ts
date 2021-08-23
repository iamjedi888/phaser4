import { AddChild3DAt } from './AddChild3DAt';
import { GetChild3DIndex } from './GetChild3DIndex';
import { IGameObject3D } from '../gameobjects3d/IGameObject3D';
import { MoveChild3DTo } from './MoveChild3DTo';
import { RemoveChild3D } from './RemoveChild3D';

//  Replaces the `target` child with the `source` child.
//  Both children are removed from their parents.
//  Source is then moved to the parent of the target.
//  Target is left without a parent after this call.
//  If both children have the same parent, target is removed from the parent and source is moved to the position target previously held.
//  Target is returned.

export function ReplaceChild3D (target: IGameObject3D, source: IGameObject3D): IGameObject3D
{
    const targetParent = target.parent;
    const sourceParent = source.parent;
    const targetIndex = GetChild3DIndex(targetParent, target);

    if (targetParent === sourceParent)
    {
        //  Remove target from parent and move source to targets position
        MoveChild3DTo(targetParent, source, targetIndex);
        RemoveChild3D(targetParent, target);
    }
    else
    {
        //  They have different parents
        RemoveChild3D(targetParent, target);
        RemoveChild3D(sourceParent, source);

        AddChild3DAt(targetParent, targetIndex, source);
    }

    return target;
}
