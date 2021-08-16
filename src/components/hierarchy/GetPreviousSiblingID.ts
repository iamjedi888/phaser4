import { HierarchyComponent } from './HierarchyComponent';

export function GetPreviousSiblingID (id: number): number
{
    return HierarchyComponent.prev[id];
}
