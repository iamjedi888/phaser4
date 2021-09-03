import { GameObjectStore, PERMISSION } from '../../gameobjects/GameObjectStore';

export function SetWillRenderChildren (id: number, value: boolean): void
{
    GameObjectStore.ui32[id][PERMISSION.WILL_RENDER_CHILDREN] = Number(value);
}
