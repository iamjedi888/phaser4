import { DepthFirstSearchFromParentID } from './DepthFirstSearchFromParentID';
import { GetWorldFromParentID } from './GetWorldFromParentID';
import { SetWorldID } from './SetWorldID';

export function RemoveWorldTag (id: number): void
{
    const world = GetWorldFromParentID(id);

    const children = DepthFirstSearchFromParentID(id, false);

    children.map(childID =>
    {
        //  remove from children list

        SetWorldID(childID, 0);
    });
}
