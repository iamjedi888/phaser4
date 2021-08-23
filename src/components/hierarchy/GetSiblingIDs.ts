import { GetNextSiblingID } from './GetNextSiblingID';

export function GetSiblingIDs (childID: number): number[]
{
    let next = GetNextSiblingID(childID);

    const output = [];

    while (next > 0)
    {
        output.push(next);

        next = GetNextSiblingID(next);
    }

    return output;
}
