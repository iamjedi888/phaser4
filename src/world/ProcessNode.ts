import { HasChildren } from '../components/hierarchy/HasChildren';
import { HasCustomDisplayList } from '../components/permissions/HasCustomDisplayList';
import { HasDirtyDisplayList } from '../components/dirty/HasDirtyDisplayList';
import { WillUpdateTransform } from '../components/dirty/WillUpdateTransform';

export function ProcessNode (node: number, cameraUpdated: boolean): boolean
{
    if (HasCustomDisplayList(node))
    {
        return HasDirtyDisplayList(node);
    }
    else if (HasChildren(node) && (cameraUpdated || WillUpdateTransform(node)))
    {
        return true;
    }

    return false;
}
