import { GetNextSiblingID } from './GetNextSiblingID';
import { GetParentID } from './GetParentID';
import { LinkSiblings } from './LinkSiblings';
import { SetLastChildID } from './SetLastChildID';
import { SetNextSiblingID } from './SetNextSiblingID';
import { SetPreviousSiblingID } from './SetPreviousSiblingID';

//  Does not check that the two children share the same parent.
//  This check should be done in advance elsewhere.

export function InsertChildIDAfter (afterID: number, childID: number): void
{
    const nextID = GetNextSiblingID(afterID);

    if (nextID)
    {
        SetPreviousSiblingID(nextID, childID);
    }
    else
    {
        //  childID is going to the end of the list
        const parentID = GetParentID(childID);

        SetLastChildID(parentID, childID);
    }

    SetNextSiblingID(childID, nextID);

    LinkSiblings(afterID, childID);
}
