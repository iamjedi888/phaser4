import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

export function SetNextSiblingID (parentID: number, childID: number): void
{
    HierarchyComponent.data[parentID][HIERARCHY.NEXT] = childID;
}
