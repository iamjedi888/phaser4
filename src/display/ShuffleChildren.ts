import { GetChildIDsFromParent } from '../components/hierarchy/GetChildIDsFromParent';
import { IGameObject } from '../gameobjects/IGameObject';
import { RelinkChildren } from '../components/hierarchy/RelinkChildren';
import { Shuffle } from '../utils/array/Shuffle';

export function ShuffleChildren <P extends IGameObject> (parent: P): IGameObject[]
{
    const children = GetChildIDsFromParent(parent);

    Shuffle(children);

    RelinkChildren(parent.id, children);

    return parent.getChildren();
}
