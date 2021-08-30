import { ClearWorldAndParentID } from '../components/hierarchy/ClearWorldAndParentID';
import { GetFirstChildID } from '../components/hierarchy/GetFirstChildID';
import { GetLastChildID } from '../components/hierarchy/GetLastChildID';
import { GetNextSiblingID } from '../components/hierarchy/GetNextSiblingID';
import { GetPreviousSiblingID } from '../components/hierarchy/GetPreviousSiblingID';
import { IGameObject } from '../gameobjects/IGameObject';
import { RemoveChildIDFromCurrentParent } from '../components/hierarchy/RemoveChildIDFromCurrentParent';
import { SetFirstChildID } from '../components/hierarchy/SetFirstChildID';
import { SetLastChildID } from '../components/hierarchy/SetLastChildID';
import { SetNextSiblingID } from '../components/hierarchy/SetNextSiblingID';
import { SetPreviousSiblingID } from '../components/hierarchy/SetPreviousSiblingID';

export function RemoveChild <P extends IGameObject, C extends IGameObject> (parent: P, child: C): C
{
    // if (RemoveChildIDFromCurrentParent(child.id))
    // {
    //     ClearWorldAndParentID(childID);
    // }

    return child;
}
