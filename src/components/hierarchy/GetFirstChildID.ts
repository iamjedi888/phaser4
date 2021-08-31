import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

export function GetFirstChildID (parentID: number): number
{
    return HierarchyComponent.data[parentID][HIERARCHY.FIRST];
}
