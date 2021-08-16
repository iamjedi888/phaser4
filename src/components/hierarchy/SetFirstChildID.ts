import { HierarchyComponent } from './HierarchyComponent';

export function SetFirstChildID (parentID: number, childID: number): void
{
    HierarchyComponent.first[parentID] = childID;
}
