import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

export function SetWorldID (id: number, worldID: number): void
{
    HierarchyComponent.data[id][HIERARCHY.WORLD] = worldID;
}
