import { AddChildAt } from './AddChildAt';
import { IGameObject } from '../gameobjects/IGameObject';

export function AddChild <P extends IGameObject, C extends IGameObject> (parent: P, child: C): C
{
    return AddChildAt(parent, child);
}
