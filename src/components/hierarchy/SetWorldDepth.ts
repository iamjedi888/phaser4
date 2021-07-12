import { HierarchyComponent } from './HierarchyComponent';

export function SetWorldDepth (id: number, worldDepth: number): void
{
    HierarchyComponent.worldDepth[id] = worldDepth;
}
