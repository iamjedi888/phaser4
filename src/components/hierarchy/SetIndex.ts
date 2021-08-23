import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

export function SetIndex (id: number, index: number): void
{
    HierarchyComponent.data[id][HIERARCHY.INDEX] = index;
}
