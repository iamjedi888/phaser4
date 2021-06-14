import { GameObjectCache } from '../../gameobjects/GameObjectCache';
import { IBaseWorld } from '../../world/IBaseWorld';

export function GetWorldFromID (worldID: number): IBaseWorld | undefined
{
    return GameObjectCache.get(worldID) as IBaseWorld;
}
