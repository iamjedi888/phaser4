import { GetParentID } from './GetParentID';
import { UpdateChildIndexes } from './UpdateChildIndexes';

export function UpdateIndexes (id: number): void
{
    const parentID = GetParentID(id);

    if (parentID > 0)
    {
        UpdateChildIndexes(parentID);
    }
}
