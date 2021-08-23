import { GetFirstChildID } from './GetFirstChildID';
import { GetNextSiblingID } from './GetNextSiblingID';

export function GetChildIDsFromParentID (id: number): number[]
{
    let next = GetFirstChildID(id);

    const output = [];

    while (next > 0)
    {
        output.push(next);

        next = GetNextSiblingID(next);
    }

    return output;
}
