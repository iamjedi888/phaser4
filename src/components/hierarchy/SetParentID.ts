import { HierarchyComponent } from './HierarchyComponent';
import { UpdateNumChildren } from './UpdateNumChildren';

export function SetParentID (childID: number, parentID: number): void
{
    HierarchyComponent.parentID[childID] = parentID;

    UpdateNumChildren(parentID);
}
