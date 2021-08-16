import { HierarchyComponent } from './HierarchyComponent';

export function SetPreviousSiblingID (parentID: number, childID: number): void
{
    HierarchyComponent.prev[parentID] = childID;
}
