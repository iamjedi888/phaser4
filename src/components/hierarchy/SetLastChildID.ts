import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

export function SetLastChildID (parentID: number, childID: number): void
{
    HierarchyComponent.data[parentID][HIERARCHY.LAST] = childID;
}
