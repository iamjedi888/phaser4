import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

export function SetWorldAndParentID (id: number, worldID: number, parentID: number): void
{
    HierarchyComponent.data[id][HIERARCHY.WORLD] = worldID;
    HierarchyComponent.data[id][HIERARCHY.PARENT] = parentID;
}
