import { SetNextSiblingID } from './SetNextSiblingID';
import { SetPreviousSiblingID } from './SetPreviousSiblingID';

//  A linked to B

//  A.next = B
//  B.prev = A

export function LinkSiblings (childA: number, childB: number): void
{
    SetNextSiblingID(childA, childB);
    SetPreviousSiblingID(childB, childA);
}
