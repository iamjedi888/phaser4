import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

export function GetLastChildID (id: number): number
{
    return HierarchyComponent.data[id][HIERARCHY.LAST];
}
