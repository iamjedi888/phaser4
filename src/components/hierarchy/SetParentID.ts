import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

export function SetParentID (childID: number, parentID: number): void
{
    HierarchyComponent.data[childID][HIERARCHY.PARENT] = parentID;
}
