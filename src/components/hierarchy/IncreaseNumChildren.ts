import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

export function IncreaseNumChildren (parentID: number, total: number = 1): void
{
    HierarchyComponent.data[parentID][HIERARCHY.NUM_CHILDREN] += total;
}
