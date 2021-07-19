import { HierarchyComponent } from './HierarchyComponent';

export function GetWorldDepth (id: number): number
{
    return HierarchyComponent.worldDepth[id];
}
