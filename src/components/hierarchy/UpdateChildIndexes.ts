import { GetChildIDsFromParentID } from './GetChildIDsFromParentID';
import { SetIndex } from './SetIndex';

export function UpdateChildIndexes (parentID: number): void
{
    const children = GetChildIDsFromParentID(parentID);

    for (let i = 0; i < children.length; i++)
    {
        SetIndex(children[i], i);
    }
}
