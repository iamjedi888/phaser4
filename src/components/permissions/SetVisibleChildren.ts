import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

import { SetDirtyParents } from '../dirty/SetDirtyParents';

export function SetVisibleChildren (id: number, value: boolean): void
{
    PermissionsComponent.data[id][PERMISSION.VISIBLE_CHILDREN] = Number(value);

    SetDirtyParents(id);
}
