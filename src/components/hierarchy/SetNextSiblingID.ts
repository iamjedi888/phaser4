import { HierarchyComponent } from './HierarchyComponent';

export function SetNextSiblingID (parentID: number, childID: number): void
{
    HierarchyComponent.next[parentID] = childID;
}
