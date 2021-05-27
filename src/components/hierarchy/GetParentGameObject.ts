import { GameObjectCache } from '../../gameobjects/GameObjectCache';
import { HierarchyComponent } from './HierarchyComponent';
import { IGameObject } from '../../gameobjects/IGameObject';

export function GetParentGameObject (id: number): IGameObject
{
    return GameObjectCache.get(HierarchyComponent.parentID[id]);
}
