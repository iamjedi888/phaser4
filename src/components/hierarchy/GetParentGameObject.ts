import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

import { GameObjectCache } from '../../gameobjects/GameObjectCache';
import { IGameObject } from '../../gameobjects/IGameObject';

export function GetParentGameObject (id: number): IGameObject
{
    return GameObjectCache.get(HierarchyComponent.data[id][HIERARCHY.PARENT]);
}
