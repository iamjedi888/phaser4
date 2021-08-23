import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

export function GetParentID (id: number): number
{
    return HierarchyComponent.data[id][HIERARCHY.PARENT];
}
