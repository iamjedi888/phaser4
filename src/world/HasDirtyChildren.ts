import { HasDirtyChildCache, HasDirtyTransform } from '../components/dirty';

import { SearchEntry } from '../display/SearchEntryType';

export function HasDirtyChildren (parent: SearchEntry): boolean
{
    if (HasDirtyChildCache(parent.node.id))
    {
        return true;
    }

    const stack = [ parent ];

    while (stack.length > 0)
    {
        const entry = stack.pop();

        if (HasDirtyTransform(entry.node.id))
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
