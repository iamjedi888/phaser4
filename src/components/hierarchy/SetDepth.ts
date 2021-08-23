import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

export function SetDepth (id: number, depth: number): void
{
    HierarchyComponent.data[id][HIERARCHY.DEPTH] = depth;
}
