import { GetWorldID } from '../hierarchy/GetWorldID';
import { PermissionsComponent } from './PermissionsComponent';
import { SetDirtyDisplayList } from '../dirty/SetDirtyDisplayList';
import { SetDirtyParents } from '../dirty/SetDirtyParents';

export function SetVisibleChildren (value: boolean, id: number): void
{
    PermissionsComponent.visibleChildren[id] = Number(value);

    SetDirtyParents(id);
    SetDirtyDisplayList(GetWorldID(id));
}
