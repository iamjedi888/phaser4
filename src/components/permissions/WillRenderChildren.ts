import { GameObjectStore, PERMISSION } from '../../gameobjects/GameObjectStore';

import { GetVisibleChildren } from './GetVisibleChildren';

export function WillRenderChildren (id: number): boolean
{
    return GetVisibleChildren(id) && Boolean(GameObjectStore.ui32[id][PERMISSION.WILL_RENDER_CHILDREN]);
}
