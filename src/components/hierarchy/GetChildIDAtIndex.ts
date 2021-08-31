import { GetFirstChildID } from './GetFirstChildID';
import { GetNextSiblingID } from './GetNextSiblingID';

export function GetChildIDAtIndex (parentID: number, index: number): number
{
    let next = GetFirstChildID(parentID);
    let total = 0;

    while (next > 0 && total < index)
    {
        next = GetNextSiblingID(next);

        total++;
    }

    return next;
}
