import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

export function DecreaseNumChildren (parentID: number, total: number = 1): void
{
    const data = HierarchyComponent.data[parentID];

    data[HIERARCHY.NUM_CHILDREN] = Math.max(0, data[HIERARCHY.NUM_CHILDREN] - total);
}
