import { GetFirstChildID } from './GetFirstChildID';
import { GetNextSiblingID } from './GetNextSiblingID';

export function BranchSearch (id: number, processCallback: (id: number) => boolean): number[]
{
    const stack = [ id ];

    let stackIndex = 1;
    let node = GetFirstChildID(id);

    const results = [];

    stackBlock:
    {
        while (stackIndex > 0)
        {
            results.push(node);

            //  Dive as deep as we can go, adding all parents to the stack for _this branch_
            //  If the parent isn't dirty and has no dirty children, go no further down this branch

            while (processCallback(node))
            {
                stack[stackIndex++] = node;

                node = GetFirstChildID(node);

                results.push(node);
            }

            //  We're at the bottom of the branch
            //  We know 'node' doesn't have any children, but the next sibling might
            //  Move horizontally through the siblings, until we hit one with kids, or the end.

            let next = GetNextSiblingID(node);

            let climb = true;

            while (next && climb)
            {
                if (processCallback(next))
                {
                    //  The 'next' sibling has a child, so we're going deeper
                    climb = false;
                    break;
                }
                else
                {
                    results.push(next);

                    next = GetNextSiblingID(next);
                }
            }

            //  The moment we get here, we need to treat it like a whole new branch
            //  We have either run out of siblings, or found one with children

            if (climb)
            {
                //  No children and no more siblings, so let's climb
                //  Go back up the stack until we find a node with a sibling

                while (next === 0)
                {
                    node = stack[--stackIndex];

                    if (!node)
                    {
                        break stackBlock;
                    }

                    next = GetNextSiblingID(node);
                }
            }

            //  'next' now contains the sibling of the stack parent, set it to 'node'
            node = next;
        }
    }

    return results;
}
