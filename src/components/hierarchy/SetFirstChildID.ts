import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

export function SetFirstChildID (parentID: number, childID: number): void
{
    HierarchyComponent.data[parentID][HIERARCHY.FIRST] = childID;
}
