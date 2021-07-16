import { GetNumChildren, GetParentID, HasParent } from '../components/hierarchy';
import { IWorld, Query } from 'bitecs';

import { BoundsComponent } from '../components/bounds';

export function CalculateWorldBounds (world: IWorld, query: Query): number
{
    //  Run query to get the objects with dirty bounds for this world

    let total = 0;
    const parentIDs: number[] = [];

    const entities = query(world).filter(id =>
    {
        const parent = GetParentID(id);
        const numChildren = GetNumChildren(id);

        if (parent > 0)
        {
            //  Add to Set
        }

        if (HasParent(id) || GetNumChildren(id) > 0)
        {
            return true;
        }
        else
        {
            //  Copy global bounds to world bounds
            BoundsComponent.world[id].set(BoundsComponent.global[id]);

            total++;

            return false;
        }
    });

    //  The entities left need further processing, either down or up






    // entities.forEach(id =>
    // {
    // });

    return total;


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
