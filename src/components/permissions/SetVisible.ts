import { GameObjectStore, PERMISSION } from '../../gameobjects/GameObjectStore';

import { GetWorldID } from '../hierarchy/GetWorldID';
import { SetDirtyDisplayList } from '../dirty/SetDirtyDisplayList';
import { SetDirtyParents } from '../dirty/SetDirtyParents';

export function SetVisible (id: number, value: boolean): void
{
    GameObjectStore.ui32[id][PERMISSION.VISIBLE] = Number(value);

    SetDirtyParents(id);
    SetDirtyDisplayList(GetWorldID(id));
}
