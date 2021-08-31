import { GameObjectCache } from '../../gameobjects/GameObjectCache';
import { GetWorldID } from './GetWorldID';
import { IBaseWorld } from '../../world/IBaseWorld';

export function GetWorldFromID (childID: number): IBaseWorld | undefined
{
    const worldID = GetWorldID(childID);

    if (worldID)
    {
        return GameObjectCache.get(worldID) as IBaseWorld;
    }
}
