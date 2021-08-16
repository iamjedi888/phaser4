import { HierarchyComponent } from './HierarchyComponent';

export function GetLastChildID (id: number): number
{
    return HierarchyComponent.last[id];
}
