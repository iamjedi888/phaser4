import { HierarchyComponent } from './HierarchyComponent';

export function HasParent (id: number): boolean
{
    return HierarchyComponent.parent[id] > 0;
}
