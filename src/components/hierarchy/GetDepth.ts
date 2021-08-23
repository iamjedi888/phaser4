import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

export function GetDepth (id: number): number
{
    return HierarchyComponent.data[id][HIERARCHY.DEPTH];
}
