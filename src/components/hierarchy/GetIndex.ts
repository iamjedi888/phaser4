import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

export function GetIndex (id: number): number
{
    return HierarchyComponent.data[id][HIERARCHY.INDEX];
}
