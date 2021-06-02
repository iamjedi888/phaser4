import { HierarchyComponent } from './HierarchyComponent';

export function SetWorldAndParentID (id: number, worldID: number, parentID: number): void
{
    HierarchyComponent.worldID[id] = worldID;
    HierarchyComponent.parentID[id] = parentID;
}
