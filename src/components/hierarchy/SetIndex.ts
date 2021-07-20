import { HierarchyComponent } from './HierarchyComponent';

export function SetIndex (id: number, index: number): void
{
    HierarchyComponent.index[id] = index;
}
