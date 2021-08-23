import { HierarchyComponent } from './HierarchyComponent';

export function ClearHierarchyComponent (id: number): void
{
    HierarchyComponent.data[id].fill(0);
}
