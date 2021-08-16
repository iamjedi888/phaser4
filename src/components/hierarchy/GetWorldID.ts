import { HierarchyComponent } from './HierarchyComponent';

export function GetWorldID (id: number): number
{
    return HierarchyComponent.world[id];
}
