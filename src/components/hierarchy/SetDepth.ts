import { HierarchyComponent } from './HierarchyComponent';

export function SetDepth (id: number, depth: number): void
{
    HierarchyComponent.depth[id] = depth;
}
