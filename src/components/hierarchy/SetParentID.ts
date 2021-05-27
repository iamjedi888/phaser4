import { HierarchyComponent } from './HierarchyComponent';

export function SetParentID (id: number, parentID: number): void
{
    HierarchyComponent.parentID[id] = parentID;
}
