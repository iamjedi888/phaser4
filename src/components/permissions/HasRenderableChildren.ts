import { GetNumChildren } from '../hierarchy/GetNumChildren';
import { HasDirtyChildCache } from '../dirty/HasDirtyChildCache';
import { PermissionsComponent } from './PermissionsComponent';
import { WillCacheChildren } from './WillCacheChildren';

export function HasRenderableChildren (id: number): boolean
{
    if (PermissionsComponent.visibleChildren[id] === 0 || PermissionsComponent.willRenderChildren[id] === 0 || GetNumChildren(id) === 0)
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
