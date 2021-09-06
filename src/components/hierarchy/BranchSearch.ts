import { GetFirstChildID } from './GetFirstChildID';
import { GetNextSiblingID } from './GetNextSiblingID';
import { HasChildren } from './HasChildren';

export function BranchSearch (parentID: number, ids: string[]): void
{
    const stack: number[] = [ parentID ];

    let node = GetFirstChildID(parentID);

    stackBlock:
    {
        while (stack.length > 0)
        {
            // console.log('Starting from', ids[node]);

            console.log('Process', ids[node]);

            //  Dive as deep as we can go, adding all parents to the stack for _this branch_

            while (HasChildren(node))
            {
                stack.push(node);

                node = GetFirstChildID(node);

                console.log('Process', ids[node]);
            }

            //  We're at the bottom of the branch
            //  Move horizontally through the siblings, until we hit one with kids

            let next = GetNextSiblingID(node);

            let climb = true;

            if (next)
            {
                let hasChildren = false;

                do
                {
                    hasChildren = HasChildren(next);

                    if (hasChildren)
                    {
                        //  We're going deeper
                        climb = false;
                        node = next;
                        break;
                    }
                    else
                    {
                        console.log('Process4', ids[next]);

                        next = GetNextSiblingID(next);
                    }

                } while (next && !hasChildren);
            }

            //  The moment we get here, we need to treat it like a whole new branch
            //  We have either run out of siblings, or found one with children

            if (climb)
            {
                //  No children and no more siblings, so let's climb
                //  Go back up the stack until we find a node with a sibling

                // console.log('Climbing up from last sibling');

                do
                {
                    node = stack.pop();

                    if (!node)
                    {
                        break stackBlock;
                    }

                    next = GetNextSiblingID(node);

                    // console.log('Popped', ids[node], ' - sibling?', ids[next]);

                } while (next === 0);
            }

            if (!node)
            {
                break stackBlock;
            }

            //  'next' now contains the sibling of the stack parent, set it to 'node'
            node = next;
        }
    }
}
