import { GameObjectCache } from '../../gameobjects/GameObjectCache';
import { GetWorldID } from './GetWorldID';
import { IBaseWorld } from '../../world/IBaseWorld';

export function GetWorldFromParentID (parentID: number): IBaseWorld | undefined
{
    const worldID = GetWorldID(parentID);

    return GameObjectCache.get(worldID) as IBaseWorld;
}
