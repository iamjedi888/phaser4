import { HierarchyComponent } from './HierarchyComponent';

export function GetNumChildren (id: number): number
{
    return HierarchyComponent.numChildren[id];
}
