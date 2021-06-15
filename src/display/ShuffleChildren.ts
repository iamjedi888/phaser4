import { GetChildIDsFromParent } from '../components/hierarchy';
import { IGameObject } from '../gameobjects/IGameObject';
import { Shuffle } from '../utils/array';

export function ShuffleChildren <P extends IGameObject> (parent: P): IGameObject[]
{
    const children = GetChildIDsFromParent(parent);

    Shuffle(children);

    return parent.getChildren();
}
