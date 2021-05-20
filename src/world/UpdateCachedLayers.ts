import { HasDirtyChildren } from './HasDirtyChildren';
import { SearchEntry } from '../display/SearchEntryType';
import { SetDirtyChildCache } from '../components/dirty';

export function UpdateCachedLayers (cachedLayers: SearchEntry[], dirtyCamera: boolean): void
{
    cachedLayers.forEach(layer =>
    {
        if (dirtyCamera || HasDirtyChildren(layer))
        {
            //  Camera is dirty, or layer has at least one dirty child
            SetDirtyChildCache(layer.node.id);
        }
        else
        {
            //  Camera is clean and no dirty children, so we can re-use layer cache
            //  So let's remove the children for this layer
            layer.children.length = 0;
        }
    });
}
