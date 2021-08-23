import { DIRTY_CONST } from '../gameobjects/DIRTY_CONST';
import { HasDirtyChildren } from './HasDirtyChildren';
import { SearchEntry3D } from '../display3d/SearchEntry3DType';

export function UpdateCachedLayers (cachedLayers: SearchEntry3D[], dirtyCamera: boolean): void
{
    cachedLayers.forEach(layer =>
    {
        if (dirtyCamera || HasDirtyChildren(layer))
        {
            //  Camera is dirty, or layer has at least one dirty child
            layer.node.setDirty(DIRTY_CONST.CHILD_CACHE);
        }
        else
        {
            //  Camera is clean and no dirty children, so we can re-use layer cache
            //  So let's remove the children for this layer
            layer.children.length = 0;
        }
    });
}
