import { HierarchyComponent } from './HierarchyComponent';

export function GetNextSiblingID (id: number): number
{
    return HierarchyComponent.next[id];
}
