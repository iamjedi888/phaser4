import { GetNumChildren, GetParentID, GetParents, HasParent } from '../components/hierarchy';
import { IWorld, Query } from 'bitecs';

import { BoundsComponent } from '../components/bounds';

const processList = new Set();

export function CalculateWorldBounds (world: IWorld, query: Query): number
{
    return 1;

    /*
    let total = 0;

    // processList.clear();

    //  The query is all entities in the world with a changed bounds component
    const entities = query(world);

    let prevParent = -1;

    entities.forEach(id =>
    {
        const parent = GetParentID(id);
        const numChildren = GetNumChildren(id);

        if (parent === 0 && numChildren === 0)
        {
            //  Copy global bounds to world bounds
            BoundsComponent.world[id].set(BoundsComponent.global[id]);

            total++;

            return;
        }

        if (parent > 0 && parent !== prevParent)
        {
            //  Only run this if we are dealing with a different parent
            GetParents(id).forEach(parentID => processList.add(parentID));

            prevParent = parent;
        }

        if (numChildren > 0)
        {
            processList.add(id);
        }
    });

    if (processList.size > 0)
    {
    }

    return total;
    */


    /*
    let x = bounds.x;
    let y = bounds.y;
    let right = bounds.right;
    let bottom = bounds.bottom;

    for (let i = 0; i < children.length; i++)
    {
        const child = children[i];

        if (!child || (visibleOnly && !child.visible))
        {
            continue;
        }

        const childBounds = child.bounds.get();

        if (childBounds.x < x)
        {
            x = childBounds.x;
        }

        if (childBounds.y < y)
        {
            y = childBounds.y;
        }

        if (childBounds.right > right)
        {
            right = childBounds.right;
        }

        if (childBounds.bottom > bottom)
        {
            bottom = childBounds.bottom;
        }
    }
    */
}
