import { HierarchyComponent } from './HierarchyComponent';
import { WillCacheChildren } from '../permissions';

export function SetRenderType (id: number): void
{
    if (WillCacheChildren(id))
    {
        HierarchyComponent.renderType[id] = 2;
        HierarchyComponent.postRenderType[id] = 3;
    }
    else
    {
        HierarchyComponent.renderType[id] = 0;
        HierarchyComponent.postRenderType[id] = 1;
    }
}
