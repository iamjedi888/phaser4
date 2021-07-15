import { IWorld, Query } from 'bitecs';

export function CalculateWorldBounds (world: IWorld, query: Query): number
{
    //  Run query to get the objects with dirty bounds for this world
    //  Go through them all and get the list of parent IDs, make it unique, order by world depth

    const entities = query(world);




    return 1;


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
