import { GetChildIDsFromParent } from '../components/hierarchy/GetChildIDsFromParent';
import { IGameObject } from '../gameobjects/IGameObject';
import { SetDirtyWorldDisplayList } from '../components/dirty/SetDirtyWorldDisplayList';
import { Shuffle } from '../utils/array/Shuffle';
import { UpdateChildIndexes } from '../components/hierarchy/UpdateChildIndexes';

export function ShuffleChildren <P extends IGameObject> (parent: P): IGameObject[]
{
    const children = GetChildIDsFromParent(parent);

    Shuffle(children);

    UpdateChildIndexes(parent.id);

    SetDirtyWorldDisplayList(parent.id);

    return parent.getChildren();
}
