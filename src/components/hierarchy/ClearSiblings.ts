import { SetNextSiblingID } from './SetNextSiblingID';
import { SetPreviousSiblingID } from './SetPreviousSiblingID';

export function ClearSiblings (childID: number): void
{
    SetNextSiblingID(childID, 0);
    SetPreviousSiblingID(childID, 0);
}
