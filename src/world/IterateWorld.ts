import { GetFirstChildID } from '../components/hierarchy/GetFirstChildID';
import { GetNextSiblingID } from '../components/hierarchy/GetNextSiblingID';
import { GetNumChildren } from '../components/hierarchy/GetNumChildren';
import { GetParentID } from '../components/hierarchy/GetParentID';
import { IBaseWorld } from './IBaseWorld';

export function IterateWorld (world: IBaseWorld): number[]
{
    const output: number[] = [];

    const worldID = world.id;

    let next: number = GetFirstChildID(worldID);

    while (next > 0)
    {
        output.push(next);

        //  Does 'next' have any children of its own?
        if (GetNumChildren(next))
        {
            next = GetFirstChildID(next);
        }
        else
        {
            const sibling = GetNextSiblingID(next);

            if (sibling === 0)
            {
                //  No more children, how about from the parent?
                const parent = GetParentID(next);

                if (parent === worldID)
                {
                    //  We're at the end of the list
                    next = 0;
                }
                else
                {
                    next = GetNextSiblingID(parent);
                }
            }
            else
            {
                next = sibling;
            }
        }
    }

    return output;
}
