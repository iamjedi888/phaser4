import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

export function SetPreviousSiblingID (parentID: number, childID: number): void
{
    HierarchyComponent.data[parentID][HIERARCHY.PREV] = childID;
}
