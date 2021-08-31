import { GetParentID } from './GetParentID';
import { GetPreviousSiblingID } from './GetPreviousSiblingID';
import { LinkSiblings } from './LinkSiblings';
import { SetFirstChildID } from './SetFirstChildID';
import { SetNextSiblingID } from './SetNextSiblingID';
import { SetPreviousSiblingID } from './SetPreviousSiblingID';

//  Does not check that the two children share the same parent.
//  This check should be done in advance elsewhere.

export function InsertChildIDBefore (beforeID: number, childID: number): void
{
    const prevID = GetPreviousSiblingID(beforeID);

    if (prevID)
    {
        SetNextSiblingID(prevID, childID);
    }
    else
    {
        //  childID is going to the start of the list
        const parentID = GetParentID(childID);

        SetFirstChildID(parentID, childID);
    }

    LinkSiblings(childID, beforeID);

    SetPreviousSiblingID(childID, prevID);
}
