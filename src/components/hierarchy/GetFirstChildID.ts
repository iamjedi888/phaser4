import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

export function GetFirstChildID (id: number): number
{
    return HierarchyComponent.data[id][HIERARCHY.FIRST];
}
