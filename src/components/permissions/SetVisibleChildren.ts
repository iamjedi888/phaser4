import { GameObjectStore, PERMISSION } from '../../gameobjects/GameObjectStore';

import { GetWorldID } from '../hierarchy/GetWorldID';
import { SetDirtyDisplayList } from '../dirty/SetDirtyDisplayList';
import { SetDirtyParents } from '../dirty/SetDirtyParents';

export function SetVisibleChildren (id: number, value: boolean): void
{
    GameObjectStore.ui8[id][PERMISSION.VISIBLE_CHILDREN] = Number(value);

    SetDirtyParents(id);
    SetDirtyDisplayList(GetWorldID(id));
}
