import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

export function GetLastChildID (parentID: number): number
{
    return HierarchyComponent.data[parentID][HIERARCHY.LAST];
}
