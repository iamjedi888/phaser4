import { GetChildIDsFromParent } from '../components/hierarchy';
import { IGameObject } from '../gameobjects/IGameObject';
import { SetDirtyWorldDisplayList } from '../components/dirty';
import { Shuffle } from '../utils/array';

export function ShuffleChildren <P extends IGameObject> (parent: P): IGameObject[]
{
    const children = GetChildIDsFromParent(parent);

    Shuffle(children);

    SetDirtyWorldDisplayList(parent.id);

    return parent.getChildren();
}
