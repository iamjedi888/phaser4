import { GetFirstChildID } from './GetFirstChildID';
import { MoveNext } from './MoveNext';

//  Returns ALL child IDs based on the given Parent, to any depth

export function DepthFirstSearchFromParentID (parentID: number, removeParent: boolean = true): number[]
{
    const output: number[] = [ parentID ];

    let next = GetFirstChildID(parentID);

    while (next > 0)
    {
        output.push(next);

        next = MoveNext(next, parentID);
    }

    //  Remove the parent from the results
    if (removeParent)
    {
        output.shift();
    }

    return output;
}
