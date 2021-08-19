import { GetNumChildren } from '../hierarchy/GetNumChildren';
import { HasDirtyChildCache } from '../dirty/HasDirtyChildCache';
import { WillCacheChildren } from './WillCacheChildren';
import { WillRenderChildren } from './WillRenderChildren';

export function HasRenderableChildren (id: number): boolean
{
    if (!WillRenderChildren(id) || GetNumChildren(id) === 0)
    {
        return false;
    }

    //  By this stage we know it has some children

    //  A Container won't cache children
    //  A RenderLayer will cache children, but check if any are dirty or not
    if (!WillCacheChildren(id) || (WillCacheChildren(id) && HasDirtyChildCache(id)))
    {
        return true;
    }

    return false;
}
