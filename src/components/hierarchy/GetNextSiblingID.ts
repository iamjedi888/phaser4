import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

export function GetNextSiblingID (id: number): number
{
    return HierarchyComponent.data[id][HIERARCHY.NEXT];
}
