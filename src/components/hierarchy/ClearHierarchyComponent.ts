import { HierarchyComponent } from './HierarchyComponent';

export function ClearHierarchyComponent (id: number): void
{
    HierarchyComponent.world[id] = 0;
    HierarchyComponent.parent[id] = 0;
    HierarchyComponent.index[id] = 0;
    HierarchyComponent.next[id] = 0;
    HierarchyComponent.prev[id] = 0;
    HierarchyComponent.first[id] = 0;
    HierarchyComponent.last[id] = 0;
    HierarchyComponent.numChildren[id] = 0;
}
