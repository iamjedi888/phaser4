import { LinkSiblings } from './LinkSiblings';
import { SetFirstChildID } from './SetFirstChildID';
import { SetLastChildID } from './SetLastChildID';
import { SetNumChildren } from './SetNumChildren';

export function RelinkChildren (parentID: number, children: number[]): void
{
    const len = children.length;

    if (len === 0)
    {
        SetNumChildren(parentID, 0);
        SetFirstChildID(parentID, 0);
        SetLastChildID(parentID, 0);

        return;
    }

    let total = 1;

    let childA = children[0];

    SetFirstChildID(parentID, childA);

    if (len === 1)
    {
        SetLastChildID(parentID, childA);

        SetNumChildren(parentID, total);

        return;
    }

    for (let i = 1; i < len; i++)
    {
        const childB = children[i];

        LinkSiblings(childA, childB);

        childA = childB;

        total++;
    }

    SetLastChildID(parentID, childA);

    SetNumChildren(parentID, total);
}
