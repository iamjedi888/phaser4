import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

export function HasParent (id: number): boolean
{
    return HierarchyComponent.data[id][HIERARCHY.PARENT] > 0;
}
