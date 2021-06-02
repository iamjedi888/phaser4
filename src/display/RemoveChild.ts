import { GetChildIndex } from './GetChildIndex';
import { IGameObject } from '../gameobjects/IGameObject';
import { RemoveChildAt } from './RemoveChildAt';

export function RemoveChild <P extends IGameObject, C extends IGameObject> (parent: P, child: C): C
{
    if (child.hasParent())
    {
        RemoveChildAt(parent, GetChildIndex(parent, child));
    }

    return child;
}
