import { HierarchyComponent } from './HierarchyComponent';

export function SetWorldID (id: number, worldID: number): void
{
    HierarchyComponent.worldID[id] = worldID;
}
