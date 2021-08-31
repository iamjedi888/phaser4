import { GetParentID } from './GetParentID';
import { GetPreviousSiblingID } from './GetPreviousSiblingID';
import { LinkSiblings } from './LinkSiblings';
import { SetFirstChildID } from './SetFirstChildID';
import { SetPreviousSiblingID } from './SetPreviousSiblingID';

//  Does not check that the two children share the same parent.
//  This check should be done in advance elsewhere.

export function AddChildIDBefore (beforeID: number, childID: number): void
{
    const prevID = GetPreviousSiblingID(beforeID);

    if (prevID)
    {
        LinkSiblings(prevID, childID);
    }
    else
    {
        //  childID is going to the start of the list
        SetPreviousSiblingID(childID, 0);

        const parentID = GetParentID(childID);

        SetFirstChildID(parentID, childID);
    }

    LinkSiblings(childID, beforeID);
}
