import { HierarchyComponent } from './HierarchyComponent';

export function GetRootID (id: number): number
{
    return HierarchyComponent.rootID[id];
}
