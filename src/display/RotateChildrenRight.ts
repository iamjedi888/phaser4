import { AddChildIDBefore } from '../components/hierarchy/AddChildIDBefore';
import { GetFirstChildID } from '../components/hierarchy/GetFirstChildID';
import { GetLastChildID } from '../components/hierarchy/GetLastChildID';
import { IGameObject } from '../gameobjects/IGameObject';
import { RemoveChildID } from '../components/hierarchy/RemoveChildID';

export function RotateChildrenRight <P extends IGameObject> (parent: P, total: number = 1): P
{
    const parentID = parent.id;

    for (let i: number = 0; i < total; i++)
    {
        const first = GetFirstChildID(parentID);
        const last = GetLastChildID(parentID);

        RemoveChildID(last);

        AddChildIDBefore(first, last);
    }

    return parent;
}
