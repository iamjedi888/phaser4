import { HierarchyComponent } from './HierarchyComponent';

export function HasParent (id: number): boolean
{
    return HierarchyComponent.parentID[id] > 0;
}
