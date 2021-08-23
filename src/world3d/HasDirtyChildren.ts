import { DIRTY_CONST } from '../gameobjects/DIRTY_CONST';
import { SearchEntry3D } from '../display3d/SearchEntry3DType';

export function HasDirtyChildren (parent: SearchEntry3D): boolean
{
    if (parent.node.isDirty(DIRTY_CONST.CHILD_CACHE))
    {
        return true;
    }

    const stack = [ parent ];

    while (stack.length > 0)
    {
        const entry = stack.pop();

        if (entry.node.isDirty(DIRTY_CONST.TRANSFORM))
        {
            return true;
        }

        const numChildren = entry.children.length;

        if (numChildren > 0)
        {
            for (let i = 0; i < numChildren; i++)
            {
                stack.push(entry.children[i]);
            }
        }
    }

    stack.length = 0;

    return false;
}
