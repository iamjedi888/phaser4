import { HierarchyComponent } from './HierarchyComponent';

export function GetDepth (id: number): number
{
    return HierarchyComponent.depth[id];
}
