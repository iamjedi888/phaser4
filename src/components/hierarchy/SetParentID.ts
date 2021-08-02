import { HierarchyComponent } from './HierarchyComponent';
import { SetDirtyTransform } from '../dirty';
import { UpdateNumChildren } from './UpdateNumChildren';

export function SetParentID (childID: number, parentID: number): void
{
    HierarchyComponent.parentID[childID] = parentID;

    SetDirtyTransform(childID);

    UpdateNumChildren(parentID);
}
