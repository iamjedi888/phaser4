import { GetWorldID } from '../hierarchy/GetWorldID';
import { PermissionsComponent } from './PermissionsComponent';
import { SetDirtyDisplayList } from '../dirty/SetDirtyDisplayList';
import { SetDirtyParents } from '../dirty/SetDirtyParents';

export function SetVisible (value: boolean, id: number): void
{
    PermissionsComponent.visible[id] = Number(value);

    SetDirtyParents(id);
    SetDirtyDisplayList(GetWorldID(id));
}
