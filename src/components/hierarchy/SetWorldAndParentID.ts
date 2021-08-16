import { HierarchyComponent } from './HierarchyComponent';

export function SetWorldAndParentID (id: number, worldID: number, parentID: number): void
{
    HierarchyComponent.world[id] = worldID;
    HierarchyComponent.parent[id] = parentID;
}
