import { HierarchyComponent } from './HierarchyComponent';

export function GetRenderType (id: number): number
{
    return HierarchyComponent.renderType[id];
}
