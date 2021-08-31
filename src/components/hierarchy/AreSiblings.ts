import { GetNextSiblingID } from './GetNextSiblingID';
import { GetPreviousSiblingID } from './GetPreviousSiblingID';

export function AreSiblings (childA: number, childB: number): boolean
{
    return (
        GetNextSiblingID(childA) === childB ||
        GetPreviousSiblingID(childA) === childB
    );
}
