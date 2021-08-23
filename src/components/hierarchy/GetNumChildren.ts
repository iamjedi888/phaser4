import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

export function GetNumChildren (id: number): number
{
    return HierarchyComponent.data[id][HIERARCHY.NUM_CHILDREN];
}
