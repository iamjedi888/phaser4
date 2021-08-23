import { DIRTY_CONST } from '../gameobjects/DIRTY_CONST';
import { GetChild3DIndex } from './GetChild3DIndex';
import { IGameObject3D } from '../gameobjects3d/IGameObject3D';

export function MoveChild3DTo <T extends IGameObject3D> (parent: IGameObject3D, child: T, index: number): T
{
    const parentChildren = parent.children;

    const currentIndex = GetChild3DIndex(parent, child);

    if (currentIndex === -1 || index < 0 || index >= parentChildren.length)
    {
        throw new Error('Index out of bounds');
    }

    if (currentIndex !== index)
    {
        //  Remove
        parentChildren.splice(currentIndex, 1);

        //  Add in new location
        parentChildren.splice(index, 0, child);

        child.setDirty(DIRTY_CONST.TRANSFORM);
    }

    return child;
}
