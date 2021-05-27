import { GetChildIndex } from './GetChildIndex';
import { IGameObject } from '../gameobjects/IGameObject';
import { RemoveChildAt } from './RemoveChildAt';

export function RemoveChild <T extends IGameObject> (parent: T, child: T): T
{
    RemoveChildAt(parent, GetChildIndex(parent, child));

    return child;
}
