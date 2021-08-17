import { GetFirstChildID } from './GetFirstChildID';
import { GetNextSiblingID } from './GetNextSiblingID';
import { GetParentID } from './GetParentID';

export function MoveNext (id: number, rootID: number): number
{
    //  Does 'id' have any children of its own?
    const firstChild = GetFirstChildID(id);

    if (firstChild > 0)
    {
        return firstChild;
    }
    else
    {
        const sibling = GetNextSiblingID(id);

        if (sibling === 0)
        {
            //  No more children, how about from the parent?
            const parent = GetParentID(id);

            if (parent === rootID)
            {
                //  We're at the end of the list
                return 0;
            }
            else
            {
                return GetNextSiblingID(parent);
            }
        }
        else
        {
            return sibling;
        }
    }
}
