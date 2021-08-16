import { HierarchyComponent } from './HierarchyComponent';

export function SetParentID (childID: number, parentID: number): void
{
    HierarchyComponent.parent[childID] = parentID;
}
