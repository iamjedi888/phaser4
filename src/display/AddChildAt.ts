import { IGameObject } from '../gameobjects/IGameObject';
import { SetParent } from './SetParent';

export function AddChildAt <T extends IGameObject> (parent: IGameObject, index: number, child: T): T
{
    const children = parent.children;

    if (index >= 0 && index <= children.length)
    {
        SetParent(parent, child);

        children.splice(index, 0, child);

        child.updateWorldTransform();
    }

    return child;
}
