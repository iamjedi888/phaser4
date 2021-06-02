import { HierarchyComponent } from './HierarchyComponent';

export function ClearWorldAndParentID (id: number): void
{
    HierarchyComponent.worldID[id] = 0;
    HierarchyComponent.parentID[id] = 0;
}
