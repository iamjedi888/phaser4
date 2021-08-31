import { GetFirstChildID } from '../components/hierarchy/GetFirstChildID';
import { GetNumChildren } from '../components/hierarchy/GetNumChildren';
import { GetParentID } from '../components/hierarchy/GetParentID';
import { IGameObject } from '../gameobjects/IGameObject';
import { InsertChildIDBefore } from '../components/hierarchy/InsertChildIDBefore';
import { SetDirtyParents } from '../components/dirty/SetDirtyParents';

export function SendChildToBack <T extends IGameObject> (child: T): T
{
    const childID = child.id;

    const parentID = GetParentID(childID);
    const numChildren = GetNumChildren(parentID);

    const first = GetFirstChildID(parentID);

    if (parentID && numChildren > 0 && childID !== first)
    {
        InsertChildIDBefore(first, childID);

        SetDirtyParents(childID);
    }

    return child;
}
