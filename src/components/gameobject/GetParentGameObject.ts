import { GameObjectCache } from '../../gameobjects/GameObjectCache';
import { GameObjectComponent } from './GameObjectComponent';
import { IGameObject } from '../../gameobjects/IGameObject';

export function GetParentGameObject (id: number): IGameObject
{
    return GameObjectCache.get(GameObjectComponent.parentID[id]);
}
