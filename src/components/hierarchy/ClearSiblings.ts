import { SetNextSiblingID } from './SetNextSiblingID';
import { SetPreviousSiblingID } from './SetPreviousSiblingID';

export function ClearSiblings (id: number): void
{
    SetNextSiblingID(id, 0);
    SetPreviousSiblingID(id, 0);
}
