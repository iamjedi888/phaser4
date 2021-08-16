import { HierarchyComponent } from './HierarchyComponent';

export function GetFirstChildID (id: number): number
{
    return HierarchyComponent.first[id];
}
