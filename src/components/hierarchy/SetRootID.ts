import { HierarchyComponent } from './HierarchyComponent';

export function SetRootID (id: number, rootID: number): void
{
    HierarchyComponent.rootID[id] = rootID;
}
