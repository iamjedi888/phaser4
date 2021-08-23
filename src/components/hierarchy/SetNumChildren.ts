import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

export function SetNumChildren (parentID: number, total: number): void
{
    HierarchyComponent.data[parentID][HIERARCHY.NUM_CHILDREN] = total;
}
