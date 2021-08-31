import { GetNextSiblingID } from './GetNextSiblingID';
import { GetParentID } from './GetParentID';
import { LinkSiblings } from './LinkSiblings';
import { SetLastChildID } from './SetLastChildID';
import { SetNextSiblingID } from './SetNextSiblingID';

//  Does not check that the two children share the same parent.
//  This check should be done in advance elsewhere.

export function AddChildIDAfter (afterID: number, childID: number): void
{
    const nextID = GetNextSiblingID(afterID);

    if (nextID)
    {
        LinkSiblings(childID, nextID);
    }
    else
    {
        //  childID is going to the end of the list
        SetNextSiblingID(childID, 0);

        const parentID = GetParentID(childID);

        SetLastChildID(parentID, childID);
    }

    LinkSiblings(afterID, childID);
}
