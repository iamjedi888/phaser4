import { HierarchyComponent } from './HierarchyComponent';

export function GetPostRenderType (id: number): number
{
    return HierarchyComponent.postRenderType[id];
}
