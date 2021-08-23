import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

export function GetPreviousSiblingID (id: number): number
{
    return HierarchyComponent.data[id][HIERARCHY.PREV];
}
