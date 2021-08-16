import { HierarchyComponent } from './HierarchyComponent';

export function SetLastChildID (parentID: number, childID: number): void
{
    HierarchyComponent.last[parentID] = childID;
}
