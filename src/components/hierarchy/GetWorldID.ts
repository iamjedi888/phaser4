import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

export function GetWorldID (id: number): number
{
    return HierarchyComponent.data[id][HIERARCHY.WORLD];
}
